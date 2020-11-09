import { Box, CircularProgress, Flex, Input, Tag, Text } from "@chakra-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  useMeQuery,
  useMessagesQuery,
  useNewMessageSubscription,
  useSendMessageMutation,
} from "../generated/types.d";
import { useRouter } from "next/router";
import { CheckIcon } from "@chakra-ui/icons";

const Chat: React.FC = () => {
  const router = useRouter();
  const { data } = useMessagesQuery();
  const { data: newMessage } = useNewMessageSubscription();
  const [messages, setMessages] = useState<any>();
  const [messageInput, setMessageInput] = useState("");
  const [sendMessage] = useSendMessageMutation({});
  const [unsentMessages, setUnsentMessages] = useState<
    { sender: string; text: string; createdAt: string }[]
  >([]);
  const { data: me, loading: loadingMe } = useMeQuery();

  if (!me && !loadingMe) router.push("/login");

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (data && messages && newMessage) {
      setMessages([...messages, newMessage?.newMessage]);
    }
    return () => {
      setUnsentMessages([]);
    };
  }, [newMessage]);

  const emitMessage = async (input: string) => {
    const sender = me?.me?.username;

    if (sender) {
      setUnsentMessages([
        ...unsentMessages,
        { sender, text: input, createdAt: moment().format("hh:mm A") },
      ]);
      await sendMessage({
        variables: {
          text: input,
          sender,
        },
      });
    }
  };

  if (messages) {
    return (
      <Box
        w={900}
        maxW="100%"
        maxHeight="100vh"
        height={600}
        bg="gray.200"
        borderRadius={8}
      >
        <ScrollableFeed>
          <Box p={6}>
            {messages
              ? messages?.map((message: any) => {
                  return me?.me?.username === message.sender ? (
                    <Flex my={2} p={2} key={message?.id}>
                      <Box>
                        <Tag variant="solid" mb={2} colorScheme="teal">
                          {message?.sender}
                        </Tag>
                        <Text
                          maxWidth={400}
                          bg="gray.50"
                          p={2}
                          borderRadius={12}
                        >
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
                        <Text
                          maxWidth={400}
                          bg="gray.50"
                          p={2}
                          borderRadius={12}
                        >
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
              ? unsentMessages?.map((message: any, key) => (
                  <Flex my={2} p={2} key={key} maxWidth={400}>
                    <Text>
                      {message?.sender}: {message?.text}
                    </Text>
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
                ))
              : null}
          </Box>
        </ScrollableFeed>
        <Box mt={6}>
          <Input
            onChange={(event) => {
              setMessageInput(event.target.value);
            }}
            placeholder="Type a message"
            variant="solid"
            bg="gray.200"
            value={messageInput}
            onKeyPress={(event) => {
              if (
                event.key === "Enter" &&
                messageInput.trim().length > 0 &&
                unsentMessages.length === 0
              ) {
                emitMessage(messageInput);
                setMessageInput("");
              }
            }}
          />
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default Chat;
