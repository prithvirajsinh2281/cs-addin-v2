export interface RestApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | Record<string, any> | FormData | null;
  properties?: Record<string, string>;
}

export async function restApiRequest<T = any>(
  url: string,
  options: RestApiOptions = {}
): Promise<T | Error> {
  const metadata = JSON.parse(localStorage.getItem("metadata") || null);
  const properties = options.properties;


  if (!metadata) {
    return new Error();
  }

  const BASE_URL =
    metadata?.ctSafeBaseUrl ? metadata?.ctSafeBaseUrl  + "api/v1/" : "https://vendor-2.contractsafe.com/api/v1/";

  const { method = "GET", headers = {}, body } = options;

  let finalHeaders: Record<string, string> = {
    Authorization: `Bearer ${metadata.ctSafeJwtToken}`,
    ...headers,
  };

  let finalBody: BodyInit | undefined;

  if (body instanceof FormData) {
    finalBody = body;
  } else if (body && typeof body === "object") {
    finalBody = JSON.stringify({
      ...body,
      lock_id: properties.ctSafeLockId,
    });
    finalHeaders["Content-Type"] = "application/json";
  } else {
    finalBody = JSON.stringify({ lock_id: properties.ctSafeLockId });
    finalHeaders["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(BASE_URL + url, {
      method,
      headers: finalHeaders,
      body: method !== "GET" && finalBody ? finalBody : undefined,
    });

    if (!response.ok) {
      const error: Error & { status?: number } = new Error("API Request failed");
      error.status = response.status;

      switch (response.status) {
        case 400:
          error.message = "Bad Request";
          break;
        case 401:
          error.message = "Unauthorized";
          break;
        case 403:
          error.message = "Forbidden";
          break;
        case 404:
          error.message = "Not Found";
          break;
        case 500:
          error.message = "Internal Server Error";
          break;
        default:
          error.message = `Unexpected Error (${response.status})`;
          break;
      }

      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (err: any) {
    if (err instanceof TypeError) {
      err.message = "Network error or invalid response";
    }
    throw err;
  }
}

export interface ContractMetadata {
  ctSafeBaseUrl: string;
  ctSafeJwtToken: string;
}

export interface ContractDetails {
  ctSafeLockId: string;
  ctSafeContractId: string;
  ctSafeContractName: string;
  ctSafeContractTitle: string;
}

export async function getXMLByNamespaceURI(): Promise<{
  contractDetailsbyXML: ContractDetails;
  contractMetaDatabyXML: ContractMetadata;
}> {
  return await Word.run(async (context: Word.RequestContext) => {
    const namespaceUri = "https://contractsafe.com/schemas/ctsafe_metadata/1.0";
    const scopedCustomXmlParts = context.document.customXmlParts.getByNamespace(namespaceUri);
    scopedCustomXmlParts.load("items");
    await context.sync();

    if (scopedCustomXmlParts.items.length === 0) {
      return { contractDetailsbyXML: null, contractMetaDatabyXML: null };
    }

    const xml = scopedCustomXmlParts.items[0].getXml();
    await context.sync();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.value, "text/xml");

    const node = xmlDoc.getElementsByTagName("ctsafe_metadata")[0];
    if (!node) {
      throw new Error("ctsafe_metadata node not found in XML.");
    }

    const ctSafeContractId = node.getAttribute("contract_id") || "";
    const ctSafeLockId = node.getAttribute("lock_id") || "";
    const ctSafeContractName = node.getAttribute("filename") || "";
    const ctSafeContractTitle = node.textContent || "";
    const ctSafeBaseUrl = node.getAttribute("base_url") || "";
    const ctSafeJwtToken = node.getAttribute("token") || "";

    const contractMetaDatabyXML: ContractMetadata = { ctSafeBaseUrl, ctSafeJwtToken };
    const contractDetailsbyXML: ContractDetails = {
      ctSafeLockId,
      ctSafeContractId,
      ctSafeContractName,
      ctSafeContractTitle,
    };

    return { contractDetailsbyXML, contractMetaDatabyXML };
  });
}

export async function getCustomProperties(): Promise<{
  contractDetailsbyCP: ContractDetails;
  contractMetaDatabyCP: ContractMetadata;
} | null> {
  return await Word.run(async (context: Word.RequestContext) => {
    let properties = context.document.properties.customProperties.load("*");
    await context.sync();

    if (!(properties.items.length > 0)) {
      return { contractDetailsbyCP: null, contractMetaDatabyCP: null };
    }

    const getValue = (key: string) => properties.items.find((p: any) => p.key === key)?.value || "";

    const ctSafeLockId = getValue("ctsafe_lock_id");
    const ctSafeContractId = getValue("ctsafe_contract_id");
    const ctSafeContractName = getValue("ctsafe_filename");
    const ctSafeContractTitle = getValue("ctsafe_filename");

    const ctSafeBaseUrl = getValue("ctsafe_base");
    const ctSafeJwtToken = getValue("ctsafe_token");

    const contractMetaDatabyCP: ContractMetadata = { ctSafeBaseUrl, ctSafeJwtToken };
    const contractDetailsbyCP: ContractDetails = {
      ctSafeLockId,
      ctSafeContractId,
      ctSafeContractName,
      ctSafeContractTitle,
    };

    return { contractDetailsbyCP, contractMetaDatabyCP };
  });
}

interface UploadParams {
  url: string;
  formDataCallback: (blob: Blob) => FormData;
  properties: Record<string, string>;
}

export async function processAndUploadDoc({
  url,
  formDataCallback,
  properties,
}: UploadParams): Promise<any> {
  try {
    return await Word.run(() => {
      return new Promise((resolve, reject) => {
        Office.context.document.getFileAsync(
          Office.FileType.Compressed,
          { sliceSize: 65536 },
          (result: Office.AsyncResult<Office.File>) => {
            if (result.status !== Office.AsyncResultStatus.Succeeded) {
              return reject(result.error);
            }

            const file = result.value;
            const sliceCount = file.sliceCount;
            let docData: Array<number[]> = [];
            let slicesReceived = 0;

            const getSlice = (index: number) => {
              file.getSliceAsync(index, async (sliceResult: Office.AsyncResult<Office.Slice>) => {
                if (sliceResult.status !== Office.AsyncResultStatus.Succeeded) {
                  file.closeAsync();
                  return reject(sliceResult.error);
                }

                docData[index] = sliceResult.value.data;
                slicesReceived++;

                if (slicesReceived === sliceCount) {
                  const byteArray: number[] = [];
                  for (let i = 0; i < sliceCount; i++) {
                    byteArray.push(...docData[i]);
                  }

                  const blob = new Blob([new Uint8Array(byteArray)], {
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  });

                  try {
                    const formData = formDataCallback(blob);
                    const data = await restApiRequest(url, {
                      method: "POST",
                      body: formData,
                      properties,
                    });

                    file.closeAsync();
                    resolve(data);
                  } catch (err) {
                    file.closeAsync();
                    reject(err);
                  }
                } else {
                  getSlice(index + 1);
                }
              });
            };

            getSlice(0);
          }
        );
      });
    });
  } catch (error: any) {
    console.error("Error uploading document:", error);
    throw new Error(error.message);
  }
}
