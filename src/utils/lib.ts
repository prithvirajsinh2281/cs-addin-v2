function onDialogMessageReceived(arg, dialog, setToken) {
  try {
    const msg = JSON.parse(arg.message);
    const token = msg.token;
    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    } else {
      console.warn("Unexpected message:", msg);
    }
  } catch (e) {
    console.warn("Non-JSON message received:", arg.message);
  } finally {
    dialog.close();
  }
}

export async function handleDialogBox({ setToken }) {
  Office.context.ui.displayDialogAsync(
    "https://vendor-2.contractsafe.com/web_word_addin_login",
    { height: 80, width: 80, displayInIframe: false },
    function (asyncResult) {
      if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
        let dialog = asyncResult.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) =>
          onDialogMessageReceived(arg, dialog, setToken)
        );
      } else {
        console.error("Dialog failed to open:", asyncResult.error);
      }
    }
  );
}
