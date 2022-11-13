import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, Chip, List, Typography } from '@mui/joy';

import useScrollToBottom from '@/hooks/useScrollToBottom';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';
import Message from '@/components/Message';

const Messages = () => {
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();

  const messagesListRef = useScrollToBottom(messages, channels);

  const activeChannel = useCallback(
    channels?.channels.find((c) => c.id === channels?.currentChannelId),
    [channels, messages],
  );

  const activeChannelMessages = useCallback(
    messages?.messages.filter((message) => {
      return message.channelId === channels?.currentChannelId;
    }),
    [channels, messages],
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          py: 0.5,
          px: 3,
          bgcolor: 'background.componentBg',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          level="body1"
          fontSize="sm"
          fontWeight="lg"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {activeChannel?.name}
        </Typography>
        <Typography level="body3">
          {activeChannelMessages?.length !== 0 && activeChannelMessages?.length}
          {activeChannelMessages?.length === 0
            ? 'No messages'
            : activeChannelMessages?.length > 1
            ? ' messages'
            : ' message'}
        </Typography>
      </Box>
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
    </>
  );
};

export default Messages;
