import { Paper, Stack, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { PrimaryButton, DialogBox, Loader } from "../components/ui";
import { HardDriveUploadIcon, ScrollTextIcon, ShieldXIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContractOperations } from "../hooks/useContractOperations";
import { Header } from "../components/layouts";
import { useContractData } from "../context/ContractMetaDataContext";

const ActionCard = ({ icon, title, description, buttonText, onClick, isEnable }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 1, background: isEnable ? "#fff" : "#00000030" }}>
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2.5}>
        {icon}
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <PrimaryButton label={buttonText} onClick={onClick} disabled={!isEnable} />
    </Stack>
  </Paper>
);

const CSActions = () => {
  const navigate = useNavigate();
  const { isLoading, saveAndReplace, handleDiscardAndUnlock } = useContractOperations();
  const { contractOperations } = useContractData();
  const [openDiscardDialogBox, setOpenDiscardDialogBox] = useState(false);

  const toggleOpenDiscardDialogBox = useCallback(
    () => setOpenDiscardDialogBox((pS) => !pS),
    [setOpenDiscardDialogBox]
  );

  const navigateToSaveAsNew = () => navigate("/save-as-new");

  const handleDiscardConfirm = async () => {
    setOpenDiscardDialogBox(false);
    await handleDiscardAndUnlock();
  };

  const actionCards = useMemo(
    () => [
      {
        icon: <HardDriveUploadIcon size={28} />,
        title: "Update in ContractSafe",
        description:
          "Upload this contract as a new version in ContractSafe. Previous contract versions are saved and accessible in the contract page's related documents.",
        buttonText: "Upload Version",
        onClick: saveAndReplace,
        isEnable: contractOperations.uploadVersion,
      },
      {
        icon: <ScrollTextIcon size={28} />,
        title: "Create New Contract",
        description: "Upload this contract as a new contract record in ContractSafe.",
        buttonText: "Create New Contract",
        onClick: navigateToSaveAsNew,
        isEnable: contractOperations.createNewContract,
      },
      {
        icon: <ShieldXIcon size={28} />,
        title: "Discard Edit & Unlock",
        description: "Undo all unsaved changes and unlock the contract for others to edit.",
        buttonText: "Discard & Unlock",
        onClick: toggleOpenDiscardDialogBox,
        isEnable: contractOperations.discardAndUnlock,
      },
    ],
    [saveAndReplace, toggleOpenDiscardDialogBox]
  );

  return (
    <>
      <Loader loading={isLoading} />
      <Header />

      <Stack spacing={3} sx={{ bgcolor: "#e9effd", p: 4, height: "100%" }}>
        {actionCards.map((card, index) => (
          <ActionCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            onClick={card.onClick}
            isEnable={card.isEnable}
          />
        ))}
      </Stack>

      <DialogBox
        open={openDiscardDialogBox}
        onClose={toggleOpenDiscardDialogBox}
        onDiscard={handleDiscardConfirm}
        title="Are you want to discard edits or continue editing?"
        description="Discarding your edits unlocks the document for other ContractSafe users."
      />
    </>
  );
};

export default CSActions;
