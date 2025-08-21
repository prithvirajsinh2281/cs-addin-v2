import React from "react";
import GetLink from "./GetLink";
import { ExternalLinkIcon } from "lucide-react";
import { useContractData } from "../../context/ContractMetaDataContext";
import { useToken } from "../../context/TokenContext";

const linkStyle = {
  background: "#f4f5f6",
  padding: ".5rem",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600",
};

const GotoContractSafe = ({ type }) => {
  // Handle public link without requiring providers
  if (type === "public") {
    return (
      <GetLink url="https://www.contractsafe.com/support" sx={linkStyle}>
        <ExternalLinkIcon size={16} />
        Go to ContractSafe
      </GetLink>
    );
  }

  // Providers required only in private case
  const { properties } = useContractData();
  const { metadata } = useToken();

  const redirectUrl =
    metadata?.ctSafeBaseUrl +
    "v3/contracts" +
    (properties?.ctSafeContractId ? `/${properties.ctSafeContractId}` : "");

  return (
    <GetLink url={redirectUrl} sx={linkStyle}>
      <ExternalLinkIcon size={16} />
      Go to ContractSafe
    </GetLink>
  );
};

export default GotoContractSafe;
