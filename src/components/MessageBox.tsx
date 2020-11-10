import { Box, Fade, Flex, Tag, Text } from "@chakra-ui/core";
import { CheckIcon } from "@chakra-ui/icons";
import moment from "moment";
import React from "react";
import { Message } from "../generated/types";

interface MessageProps {
  message: Message;
  isMine: Boolean;
  isUnsent: Boolean;
}

export const MessageBox: React.FC<MessageProps> = ({
  message,
  isUnsent,
  isMine,
}) => {
  return (
    <Flex my={2} p={2}>
      <Box>
        <Tag variant="subtle" mb={2} colorScheme={isMine ? "teal" : undefined}>
          {message?.sender}
        </Tag>
        <Text
          maxWidth={400}
          bg="gray.50"
          p={2}
          borderRadius={12}
          boxShadow="0 2px 2px #0f0f0f0f"
        >
          {message?.text}
        </Text>
      </Box>
      <Flex ml="auto" alignItems="center">
        {isUnsent ? (
          <>{moment().format("hh:mm A")}</>
        ) : (
          <>
            <Fade in={true}>
              <CheckIcon fontSize={12} mr={3} color="teal.500" />
            </Fade>
            {moment(message?.createdAt).format("hh:mm A")}
          </>
        )}
      </Flex>
    </Flex>
  );
};
