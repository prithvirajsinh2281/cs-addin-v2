import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import theme from "./components/ui/theme";
import { ThemeProvider } from "@mui/material";

/* global document, Office, module, require, HTMLElement */

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
