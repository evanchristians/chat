import { CircularProgress, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { useMeQuery } from "../generated/types.d";

export const Nav: React.FC = () => {
  const { data, loading } = useMeQuery();

  if (loading) return <CircularProgress isIndeterminate />;
  return (
    <Flex
      px={8}
      alignItems="center"
      justifySelf="start"
      bg="gray.200"
      h={14}
      w="100%"
    >
      {data?.me ? <Text>hi {data?.me?.username}, you motherfucker</Text> : null}
    </Flex>
  );
};
