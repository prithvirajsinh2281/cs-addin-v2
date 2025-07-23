import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of our context
export interface TokenContextType {
  logout: () => void;
  isAuthenticated: boolean;
  metadata: ContractMetaData | null;
  setMetadata: (metadata: ContractMetaData | null) => void;
}

// Create the context with undefined as initial value
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Custom hook to use the token context
export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

// Props interface for TokenProvider
interface TokenProviderProps {
  children: ReactNode;
}

export type ContractMetaData = {
  ctSafeBaseUrl: string;
  ctSafeJwtToken: string;
};

// Token Provider component
export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [metadata, setMetadata] = useState<ContractMetaData | null>(() => {
    const stored = localStorage.getItem("metadata");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (metadata) {
      localStorage.setItem("metadata", JSON.stringify(metadata));
    } else {
      localStorage.removeItem("metadata");
    }
  }, [metadata]);

  const logout = (): void => {
    setMetadata(null);
  };

  const value: TokenContextType = {
    logout,
    isAuthenticated: !!metadata?.ctSafeJwtToken,
    metadata,
    setMetadata,
  };

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};
