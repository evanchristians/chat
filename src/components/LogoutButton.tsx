import { Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/types.d";

export const LogoutButton: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [logout] = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  return data?.me?.user ? (
    <Box position="fixed" top={2} right={2}>
      <Button
        onClick={async () => {
          setIsLoading(true);
          await logout({
            update: (cache) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: null,
                },
              });
            },
          });
          router.push("/login");
        }}
        isLoading={loading || isLoading}
      >
        Logout
      </Button>
    </Box>
  ) : null;
};
