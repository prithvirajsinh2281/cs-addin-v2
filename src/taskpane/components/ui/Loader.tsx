import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ loading }) => {
  return loading ? (
    <>
      <Box
        style={{
          background: "#00000030",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <CircularProgress />
      </Box>
    </>
  ) : null;
};

export default Loader;
