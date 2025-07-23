import { Link, LinkProps } from "@mui/material";
import React from "react";

/**
 * Props for the GetLink component.
 * Extends MUI's LinkProps and adds a required `url` prop.
 */
interface GetLinkProps extends LinkProps {
  /** URL to open when the link is clicked */
  url: string;
  /** Content inside the link (typically text or icon + text) */
  children: React.ReactNode;
}

/**
 * A wrapper over MUI's Link component to support opening links
 * using `Office.context.ui.openBrowserWindow` (if available) for Office Add-ins,
 * or fallback to standard `window.open` in the browser.
 *
 * The component accepts all MUI `LinkProps`, including `sx`, and handles styling consistently.
 *
 * @example
 * <GetLink url="https://example.com">Open Example</GetLink>
 */
const GetLink: React.FC<GetLinkProps> = ({ url, children, sx, ...rest }) => {
  /**
   * Handles link click event.
   * Uses Office Add-in method to open the link if available, otherwise uses `window.open`.
   */
  const handleClick = () => {
    if (Office?.context?.ui?.openBrowserWindow) {
      Office.context.ui.openBrowserWindow(url);
    } else {
      // Security-conscious fallback for standard browsers
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Link
      onClick={handleClick}
      underline="hover"
      color="primary"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: 14,
        cursor: "pointer",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default GetLink;
