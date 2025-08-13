import React from "react";
import { useToken } from "../context/TokenContext";

const useLoginDialogBox = () => {
  const { metadata, setMetadata } = useToken();

  function onDialogMessageReceived(arg, dialog) {
    try {
      const msg = JSON.parse(arg.message);
      const token = msg.token;
      if (token) {
        setMetadata({
          ...metadata,
          ctSafeJwtToken: token,
        });
      } else {
        console.warn("Unexpected message:", msg);
      }
    } catch (e) {
      console.warn("Non-JSON message received:", arg.message);
    } finally {
      dialog.close();
    }
  }

  async function handleDialogBox() {
    const url = metadata
      ? `${metadata?.ctSafeBaseUrl}office-addin`
      : "https://vendor-2.contractsafe.com/office-addin";

    console.log("HEllo World ::", metadata, url);

    Office.context.ui.displayDialogAsync(
      url,
      { height: 80, width: 80, displayInIframe: false },
      function (asyncResult) {
        if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
          let dialog = asyncResult.value;
          dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) =>
            onDialogMessageReceived(arg, dialog)
          );
        } else {
          console.error("Dialog failed to open:", asyncResult.error);
        }
      }
    );
  }

  return handleDialogBox;
};

export default useLoginDialogBox;
