import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { SnackBar } from "../components/ui";
import RenderSnackbarContent from "../components/ui/RenderSnackbarContent";

export type RichContentPart =
  | { type: "text"; value: string[] }
  | { type: "link"; value: string; url: string };

export type SnackbarContent = {
  type: "plain" | "rich";
  value: string | RichContentPart[];
};

export type SnackbarData = {
  open: boolean;
  severity: "success" | "error" | "info" | "warning";
  content: SnackbarContent;
  title?: string;
  navigationView?: boolean;
  navigationPath?: string;
};

type SnackbarContextType = {
  snackbar: SnackbarData;
  showSnackbar: (data: Partial<SnackbarData>) => void;
  hideSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarData>({
    open: false,
    severity: "error",
    title: "",
    content: { type: "plain", value: "Your action could not updated" },
    navigationView: true,
    navigationPath: "/cs-success",
  });

  const navigate = useNavigate();

  const showSnackbar = (data: Partial<SnackbarData>) => {
    const newSnackbarData = {
      open: data?.open ?? false,
      severity: data?.severity ?? "success",
      title: data?.title ?? "",
      content: data?.content ?? { type: "plain", value: "" },
      navigationView: data?.navigationView ?? false,
      navigationPath: data?.navigationPath ?? "/cs-success",
    };

    console.log("SNACKBARDATA", { data, newSnackbarData });
    setSnackbar(newSnackbarData);

    if (newSnackbarData.navigationPath) {
      navigate(newSnackbarData.navigationPath);
    }
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));

    navigate("/expired-cslock");
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, hideSnackbar }}>
      {children}
      {snackbar.open && (
        <SnackBar
          title={snackbar.title}
          message={<RenderSnackbarContent withLink={false} />}
          severity={snackbar.severity}
          onDismiss={hideSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};
