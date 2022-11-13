import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { List } from '@mui/joy';

import useScrollToBottom from '@/hooks/useScrollToBottom';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';
import Message from '@/components/Message';

const Messages = () => {
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();

  const messagesListRef = useScrollToBottom(messages, channels);

  const activeChannelMessages = useCallback(
    messages?.messages.filter((message) => {
      return message.channelId === channels?.currentChannelId;
    }),
    [channels, messages],
  );

  return (
    <List
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        overflow: 'auto',
      }}
      ref={messagesListRef}
    >
      {activeChannelMessages?.map(({ id, username, content }) => (
        <Message
          key={id}
          username={username}
          content={content}
          byCurrentUser={username === currentUsername}
        />
      ))}
    </List>
  );
};

export default Messages;
