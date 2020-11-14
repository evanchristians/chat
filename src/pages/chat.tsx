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
  const [sendMessage] = useSendMessageMutation({});
  const [unsentMessages, setUnsentMessages] = useState<
    { sender: string; text: string; createdAt: string }[]
  >([]);
  const { data: meData, loading: loadingMeData } = useMeQuery();

  useEffect(() => {
    if (!meData?.me?.user && !loadingMeData) {
      router.push("/login");
    }
  }, [meData]);

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
    const sender = meData?.me?.user?.username;

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
          height="100%"
          bg="gray.200"
          pb={20}
          borderRadius={12}
          overflow="hidden"
          boxShadow="0 2px 2px #0f0f0f04"
        >
          <MessageFeed
            me={meData}
            unsentMessages={unsentMessages}
            messages={messages}
          />
          <Flex px={4} height={20} alignItems="center">
            <Input
              placeholder="Type a message"
              size="lg"
              bg="white"
              _focus={{
                outline: "none",
              }}
              onKeyPress={(event) => {
                const value = event.currentTarget.value;
                if (
                  event.key === "Enter" &&
                  value.trim().length > 0 &&
                  unsentMessages.length === 0
                ) {
                  emitMessage(event.currentTarget.value);
                  event.currentTarget.value = "";
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
