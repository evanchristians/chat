import { Button, Box, Tag } from "@chakra-ui/core";
import React, { useState } from "react";
import { useRemoveMessagesMutation } from "../generated/types.d";

const DeleteMessages: React.FC = () => {
  const [removeMessages] = useRemoveMessagesMutation({});
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <Box textAlign="center">
      <Button
        onClick={async () => {
          setLoading(true);
          const { data } = await removeMessages();
          if (data) {
            setDeleted(true);
            setLoading(false);
          }
        }}
        isLoading={loading}
      >
        Delete Messages
      </Button>
      {deleted ? (
        <Box mt={6}>
          <Tag colorScheme="teal">Messages Deleted Successfully</Tag>
        </Box>
      ) : null}
    </Box>
  );
};

export default DeleteMessages;
