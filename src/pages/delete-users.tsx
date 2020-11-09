import { Button, Box, Tag } from "@chakra-ui/core";
import React, { useState } from "react";
import { useRemoveUsersMutation } from "../generated/types.d";

const DeleteUsers: React.FC = () => {
  const [removeUsers] = useRemoveUsersMutation({});
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <Box textAlign="center">
      <Button
        onClick={async () => {
          setLoading(true);
          const { data } = await removeUsers();
          if (data) {
            setDeleted(true);
            setLoading(false);
          }
        }}
        isLoading={loading}
      >
        Delete Users
      </Button>
      {deleted ? (
        <Box mt={6}>
          <Tag colorScheme="teal">Users Deleted Successfully</Tag>
        </Box>
      ) : null}
    </Box>
  );
};

export default DeleteUsers;
