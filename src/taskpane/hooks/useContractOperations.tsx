import { useState } from "react";
import { useContractData } from "../context/ContractMetaDataContext";
import { SnackbarContent, useSnackbar } from "../context/SnackbarContext";
import { processAndUploadDoc, restApiRequest } from "../../utils/commonMethod";
import { useToken } from "../context/TokenContext";

export const useContractOperations = () => {
  const { properties } = useContractData();
  const { metadata } = useToken();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const showError = (
    title = "Something went wrong",
    message = "Your action could not be completed!"
  ) =>
    showSnackbar({
      open: true,
      title,
      severity: "error",
      content: { type: "plain", value: message },
    });

  const executeOperation = async (operation) => {
    setIsLoading(true);
    try {
      await operation();
    } catch (error) {
      console.error("Operation Error:", error);
      showError();
    } finally {
      setIsLoading(false);
    }
  };

  const createFormData = (blob: Blob, additionalData: Record<string, string> = {}) => {
    const formData = new FormData();
    formData.append("uploadedFile", blob, "document.docx");
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return formData;
  };

  const createRichContent = (textParts, linkValue, contractId) =>
    ({
      type: "rich",
      value: [
        { type: "text", value: textParts },
        {
          type: "link",
          value: linkValue,
          url: `${metadata.ctSafeBaseUrl}v3/contracts/${contractId}`,
        },
      ],
    }) as SnackbarContent;

  const saveAndReplace = () =>
    executeOperation(async () => {
      const res = await processAndUploadDoc({
        url: `ms_word/replace_contract/${properties.ctSafeContractId}`,
        formDataCallback: (blob) =>
          createFormData(blob, {
            movetorelated: "true",
            lock_id: properties.ctSafeLockId,
          }),
        properties,
      });
      if (!res) throw new Error("No response received");

      showSnackbar({
        open: true,
        title: "Contract Updated!",
        content: createRichContent(
          ["A new contract version for", "has been created in ContractSafe."],
          properties.ctSafeContractTitle,
          properties.ctSafeContractId
        ),
        navigationPath: "/cs-success",
        navigationView: true,
      });
    });

  const saveNew = async (newContractName) => {
    executeOperation(async () => {
      const res = await processAndUploadDoc({
        url: "ms_word/save_new_contract",
        formDataCallback: (blob) =>
          createFormData(blob, {
            title: newContractName,
            ...(properties?.ctSafeLockId && { lock_id: properties.ctSafeLockId }),
          }),
        properties,
      });
      if (!res) throw new Error("No response received");

      showSnackbar({
        open: true,
        title: "New Contract Created!",
        content: createRichContent(
          ["A new contract with the name", "has been created in ContractSafe."],
          newContractName,
          res.contracts?.[0]?.uuid
        ),
        navigationPath: "/cs-success",
        navigationView: true,
      });
    });
  };

  const handleDiscardAndUnlock = () =>
    executeOperation(async () => {
      await restApiRequest(`ms_word/unlock_contract/${properties.ctSafeLockId}`, {
        method: "GET",
        properties,
      });

      showSnackbar({
        open: false,
        title: "Edit Discarded!",
        content: {
          type: "plain",
          value: `You've discarded the edits for ${properties.ctSafeContractTitle}, unlocking the document for other users to edit. Please check this document out again before editing it in Word.`,
        },
        navigationPath: "/cs-success",
        navigationView: true,
      });
    });

  return { isLoading, saveAndReplace, saveNew, handleDiscardAndUnlock };
};
