import { Box, Flex, Input } from "@chakra-ui/core";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MessageFeed from "../components/MessageFeed";
import {
  useMeQuery,
  useMessagesQuery,
  useNewMessageSubscription,
  useSendMessageMutation,
} from "../generated/types.d";

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
      <Flex
        w="100%"
        maxW={1200}
        height={800}
        maxHeight="calc(100vh - 2rem)"
        flexDirection="column"
        px={8}
      >
        <Box
          maxHeight="100%"
          bg="gray.200"
          pb={20}
          borderRadius={4}
          overflow="hidden"
          boxShadow="0 1rem 1rem #0f0f0f04"
        >
          <MessageFeed
            me={me}
            unsentMessages={unsentMessages}
            messages={messages}
          />
          <Flex px={4} height={20} alignItems="center">
            <Input
              onChange={(event) => {
                setMessageInput(event.target.value);
              }}
              placeholder="Type a message"
              size="lg"
              value={messageInput}
              bg="white"
              _focus={{
                outline: "none"
              }}
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
          </Flex>
        </Box>
      </Flex>
    );
  } else {
    return null;
  }
};

export default Chat;
