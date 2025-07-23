import React from "react";
import { useSnackbar } from "../../context/SnackbarContext";
import GetLink from "./GetLink";

const RenderSnackbarContent = ({ withLink }) => {
  const { snackbar } = useSnackbar();

  const { content } = snackbar;

  if (!content || !content.type || !content.value) return null;

  if (content.type === "plain" && typeof content.value === "string") {
    return <>{content.value}</>;
  }

  if (content.type === "rich" && Array.isArray(content.value)) {
    const textPart = content.value.find((part) => part.type === "text") as
      | { type: "text"; value: [string, string] }
      | undefined;

    const linkPart = content.value.find((part) => part.type === "link") as
      | { type: "link"; value: string; url: string }
      | undefined;

    if (!textPart || !linkPart) return null;

    if (withLink) {
      return (
        <>
          {textPart.value[0]}&nbsp;
          <GetLink url={linkPart.url} sx={{ display: "inline", color: "inherit !important" }}>
            {linkPart.value}
          </GetLink>
          &nbsp;{textPart.value[1]}
        </>
      );
    }

    return (
      <>
        {textPart.value[0]}&nbsp;{linkPart.value}
        &nbsp;{textPart.value[1]}
      </>
    );
  }

  return null;
};

export default RenderSnackbarContent;
