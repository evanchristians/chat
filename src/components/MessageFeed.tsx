import { Box, CircularProgress, Flex, Tag, Text } from "@chakra-ui/core";
import { CheckIcon } from "@chakra-ui/icons";
import moment from "moment";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { MeQuery, MessagesQuery } from "../generated/types.d";

export type UnsentMessageProps = {};
export type MessageFeedProps = {
  unsentMessages: UnsentMessageProps[];
  messages: MessagesQuery[];
  me: MeQuery | undefined;
};

const MessageFeed: React.FC<MessageFeedProps> = ({
  unsentMessages,
  me,
  messages,
}) => {
  return (
    <ScrollableFeed>
      <Box p={6} >
        {messages
          ? messages?.map((message: any) => {
              return me?.me?.username === message.sender ? (
                <Flex my={2} p={2} key={message?.id}>
                  <Box>
                    <Tag variant="solid" mb={2} colorScheme="teal">
                      {message?.sender}
                    </Tag>
                    <Text maxWidth={400} bg="gray.50" p={2} borderRadius={12}>
                      {message?.text}
                    </Text>
                  </Box>
                  <Flex ml="auto" alignItems="center">
                    <CheckIcon fontSize={12} mr={3} color="teal.500" />
                    {moment(message?.createdAt).format("hh:mm A")}
                  </Flex>
                </Flex>
              ) : (
                <Flex my={2} p={2} key={message?.id}>
                  <Box>
                    <Tag variant="solid" mb={2}>
                      {message?.sender}
                    </Tag>
                    <Text maxWidth={400} bg="gray.50" p={2} borderRadius={12}>
                      {message?.text}
                    </Text>
                  </Box>
                  <Flex ml="auto" alignItems="center">
                    <CheckIcon fontSize={12} mr={3} color="teal.500" />
                    {moment(message?.createdAt).format("hh:mm A")}
                  </Flex>
                </Flex>
              );
            })
          : null}
        {unsentMessages
          ? unsentMessages?.map((message: any) => {
              return me?.me?.username === message.sender ? (
                <Flex my={2} p={2} key={message?.id}>
                  <Box>
                    <Tag variant="solid" mb={2} colorScheme="teal">
                      {message?.sender}
                    </Tag>
                    <Text maxWidth={400} bg="gray.50" p={2} borderRadius={12}>
                      {message?.text}
                    </Text>
                  </Box>
                  <Flex ml="auto" alignItems="center">
                    <CircularProgress
                      color="gray.500"
                      mr={3}
                      size={3}
                      isIndeterminate
                    />
                    {moment().format("hh:mm A")}
                  </Flex>
                </Flex>
              ) : (
                <Flex my={2} p={2} key={message?.id}>
                  <Box>
                    <Tag variant="solid" mb={2}>
                      {message?.sender}
                    </Tag>
                    <Text maxWidth={400} bg="gray.50" p={2} borderRadius={12}>
                      {message?.text}
                    </Text>
                  </Box>
                  <Flex ml="auto" alignItems="center">
                    <CircularProgress
                      color="gray.500"
                      mr={3}
                      size={3}
                      isIndeterminate
                    />
                    {moment().format("hh:mm A")}
                  </Flex>
                </Flex>
              );
            })
          : null}
      </Box>
    </ScrollableFeed>
  );
};

export default MessageFeed;
