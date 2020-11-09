import { Flex, FlexProps } from "@chakra-ui/core";

export const Container = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      {...props}
    />
  );
};
