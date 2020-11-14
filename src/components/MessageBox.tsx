import { Fade, Flex, Tag, Text } from "@chakra-ui/core";
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
      <Flex flexDirection="column" width="100%">
        <Tag
          variant="subtle"
          mb={2}
          bg={isMine ? "_purple" : "gray.500"}
          color="white"
          ml={isMine ? "auto" : undefined}
          mr={isMine ? undefined : "auto"}
        >
          {message?.sender}
        </Tag>
        <Flex
          bg="gray.50"
          pr={2}
          py={2}
          pl={4}
          borderRadius={12}
          boxShadow="0 2px 2px #0f0f0f0f"
          ml={isMine ? "auto" : undefined}
          mr={isMine ? undefined : "auto"}
        >
          <Text fontSize={15} maxWidth={400}>
            {message?.text}
          </Text>
          <Flex ml="auto" pl={8} alignItems="center" justifyContent="flex-end">
            {isUnsent ? (
              <>
                <CheckIcon
                  fontSize={12}
                  mr={3}
                  color="gray.700"
                  opacity={0.2}
                />
                <Text fontSize={12} color="gray.500">
                  {moment().format("hh:mm A")}
                </Text>
              </>
            ) : (
              <>
                <Fade in={true}>
                  <CheckIcon fontSize={12} mr={3} color="_purple" />
                </Fade>
                <Text fontSize={12} color="gray.500">
                  {moment(message?.createdAt).format("hh:mm A")}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
