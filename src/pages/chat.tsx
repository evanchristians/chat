import { Box, Flex, Input, Text } from "@chakra-ui/core";
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
              ? messages?.map((message: any) => (
                  <Flex my={2} p={2} key={message?.id}>
                    <Text>
                      {message?.sender}: {message?.text}
                    </Text>
                    <Text ml="auto">
                      {moment(message?.createdAt).format("hh:mm A")}
                    </Text>
                  </Flex>
                ))
              : null}
            {unsentMessages
              ? unsentMessages?.map((message: any, key) => (
                  <Flex my={2} p={2} key={key} opacity="0.25">
                    <Text>
                      {message?.sender}: {message?.text}
                    </Text>
                    <Text ml="auto">
                      {moment(message?.createdAt).format("hh:mm A")}
                    </Text>
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
