import { Box } from "@chakra-ui/core";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { MeQuery, MessagesQuery } from "../generated/types.d";
import { MessageBox } from "./MessageBox";

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
      <Box p={6}>
        {messages?.map((message: any, key) => (
          <MessageBox
            message={message}
            isMine={me?.me?.user?.username === message.sender}
            isUnsent={false}
            key={key}
          />
        ))}
        {unsentMessages?.map((message: any, key) => (
          <MessageBox
            message={message}
            isMine={me?.me?.user?.username === message.sender}
            isUnsent={true}
            key={key}
          />
        ))}
      </Box>
    </ScrollableFeed>
  );
};

export default MessageFeed;
