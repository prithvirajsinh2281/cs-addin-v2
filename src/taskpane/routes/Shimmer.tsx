import React from "react";
import { Skeleton, Stack, Container } from "@mui/material";

const ShimmerScreen = () => {
  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Stack spacing={2}>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 2 }} />
      </Stack>
    </Container>
  );
};

export default ShimmerScreen;
