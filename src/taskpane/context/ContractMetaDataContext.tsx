import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  getCustomProperties,
  getXMLByNamespaceURI,
  restApiRequest,
} from "../../utils/commonMethod";
import { useNavigate } from "react-router-dom";
import ShimmerScreen from "../routes/Shimmer";
import { ContractMetaData, useToken } from "./TokenContext";

type ContractProperties = {
  ctSafeLockId: string;
  ctSafeContractId: string;
  ctSafeContractName: string;
  ctSafeContractTitle: string;
};

type ContractDataContextType = {
  properties: ContractProperties | null;

  error: string | null;
  setProperties: (properties: ContractProperties | null) => void;

  clearError: () => void;
  contractOperations: ContractOperations;
};

type ContractOperations = {
  uploadVersion: boolean;
  createNewContract: boolean;
  discardAndUnlock: boolean;
};

const ContractDataContext = createContext<ContractDataContextType | undefined>(undefined);

export const useContractData = () => {
  const context = useContext(ContractDataContext);
  if (context === undefined) {
    throw new Error("useContractData must be used within a ContractDataProvider");
  }
  return context;
};

type ContractDataProviderProps = {
  children: ReactNode;
};

export const ContractDataProvider: React.FC<ContractDataProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<ContractProperties | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contractOperations, setContractOperations] = useState<ContractOperations>({
    uploadVersion: true,
    createNewContract: true,
    discardAndUnlock: true,
  });

  const navigate = useNavigate();
  const { metadata, setMetadata } = useToken();

  const triggerDocumentLock = useCallback(
    async (properties: ContractProperties) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await restApiRequest("ms_word/trigger_document_lock", {
          method: "POST",
          properties,
        });
      } catch (error: any) {
        if (error?.status === 404) {
          navigate("/expired-cslock");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError]
  );

  const fetchContractData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const xmlProps = await getXMLByNamespaceURI();
      const { contractDetailsbyXML, contractMetaDatabyXML } = xmlProps;

      let masterContractDetails: ContractProperties = contractDetailsbyXML;
      let masterContractMetaData: ContractMetaData = contractMetaDatabyXML;

      if (!contractDetailsbyXML || !contractMetaDatabyXML) {
        const { contractDetailsbyCP, contractMetaDatabyCP } = await getCustomProperties();

        masterContractDetails = contractDetailsbyCP;
        masterContractMetaData = contractMetaDatabyCP;

        if (!masterContractDetails || !masterContractMetaData) {
          throw new Error("Missing contract details or metadata from both sources");
        }
      }

      setProperties(masterContractDetails);
      setMetadata(masterContractMetaData);

      await triggerDocumentLock(masterContractDetails);
    } catch (error: any) {
      if (metadata && !properties) {
        setContractOperations((pS) => ({ ...pS, uploadVersion: false, discardAndUnlock: false }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [setProperties, setMetadata, setIsLoading, setError, triggerDocumentLock]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: ContractDataContextType = {
    properties,
    error,
    contractOperations,
    setProperties,

    clearError,
  };

  useEffect(() => {
    fetchContractData();
  }, [fetchContractData]);

  return (
    <ContractDataContext.Provider value={value}>
      {isLoading ? <ShimmerScreen /> : children}
    </ContractDataContext.Provider>
  );
};
