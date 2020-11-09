import { Box, Button } from "@chakra-ui/core";
import React from "react";
import { useMeQuery } from "../generated/types.d";

export const LogoutButton: React.FC = () => {
  const { data, loading } = useMeQuery();

  if (!data && !loading) return null;
  return (
    <Box position="fixed" top={6} right={6}>
      <Button isLoading={loading}>Logout</Button>
    </Box>
  );
};
