import React, { useEffect, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "../layouts";
import { TokenProvider, useToken } from "../context/TokenContext";
import { ContractDataProvider } from "../context/ContractMetaDataContext";
import { CSSuccess, CSActions, ExpiredCSLock, SaveAsNew, ShimmerScreen } from "../routes";
import { getCustomProperties } from "../../utils/commonMethod";

const AppContent = () => {
  const { isAuthenticated, setMetadata } = useToken();
  const [isInitializing, setIsInitializing] = useState(true);

  const navItems = [
    { route: "/", label: "Home", Component: <CSActions /> },
    { route: "/cs-success", label: "CS Success", Component: <CSSuccess /> },
    { route: "/expired-cslock", label: "Expired CSLock", Component: <ExpiredCSLock /> },
    { route: "/save-as-new", label: "Save as New", Component: <SaveAsNew /> },
  ];

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isAuthenticated) {
          setIsInitializing(false);
          return;
        }

        const { contractMetaDatabyCP } = await getCustomProperties();

        if (contractMetaDatabyCP?.ctSafeJwtToken) {
          setMetadata({
            ctSafeBaseUrl: "https://vendor-2.contractsafe.com/",
            ctSafeJwtToken: contractMetaDatabyCP.ctSafeJwtToken,
          });
        }
      } catch (error) {
        console.log("No JWT token found in document, user remains unauthenticated");
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [isAuthenticated, setMetadata]);

  if (isInitializing) {
    return <ShimmerScreen />;
  }

  return (
    <Router>
      {isAuthenticated ? (
        <ContractDataProvider>
          <Routes>
            {navItems.map(({ route, Component }) => {
              return (
                <Route
                  key={route}
                  path={route}
                  element={<PrivateLayout>{Component}</PrivateLayout>}
                />
              );
            })}
          </Routes>
        </ContractDataProvider>
      ) : (
        <Routes>
          <Route path="/" element={<PublicLayout />} />
        </Routes>
      )}
    </Router>
  );
};

const App = () => {
  return (
    <TokenProvider>
      <AppContent />
    </TokenProvider>
  );
};

export default App;
