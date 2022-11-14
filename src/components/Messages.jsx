import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { List } from '@mui/joy';

import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import Message from '@/components/Message';
import MessagesBage from '@/components/MessagesBage';

const Messages = () => {
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();

  const autoScrollRef = useScrollToBottom(messages, channels);

  const activeChannel = useCallback(
    channels?.channels.find((c) => c.id === channels?.currentChannelId),
    [channels],
  );

  const activeChannelMessages = useCallback(
    messages?.messages.filter(
      (m) => m.channelId === channels?.currentChannelId,
    ),
    [channels, messages],
  );

  const renderedMessages = activeChannelMessages?.map(
    ({ id, username, content }) => (
      <Message
        key={id}
        username={username}
        content={content}
        byCurrentUser={username === currentUsername}
      />
    ),
  );

  return (
    <>
      <MessagesBage
        channelsName={activeChannel?.name}
        messagesCount={activeChannelMessages?.length}
      />
      <List
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          overflow: 'auto',
        }}
        ref={autoScrollRef}
      >
        {renderedMessages}
      </List>
    </>
  );
};

export default Messages;
