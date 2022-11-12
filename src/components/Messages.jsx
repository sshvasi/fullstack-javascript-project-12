import { useSelector } from 'react-redux';
import { Box, List, ListItem, ListItemContent, Typography } from '@mui/joy';

import useScrollToBottom from '@/hooks/useScrollToBottom';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';

const Messages = () => {
  const { username } = useSelector((state) => state.auth);
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();

  const messagesListRef = useScrollToBottom(messages);

  const activeChannelMessages = messages?.messages.filter((message) => {
    return message.channelId === channels?.currentChannelId;
  });

  return (
    <Box
      sx={{
        px: 3,
        flexGrow: 1,
        overflow: 'auto',
      }}
      ref={messagesListRef}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '--List-item-radius': '24px',
        }}
      >
        {activeChannelMessages?.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              maxWidth: 500,
              py: 1,
              px: 2,
              alignSelf: message.username === username ? 'flex-end' : 'flex-start',
              bgcolor:
                message.username === username ? 'background.currentUser' : 'background.componentBg',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <ListItemContent key={message.id}>
              <Typography
                sx={{
                  fontSize: 'sm',
                  fontWeight: 'lg',
                  color: message.username === username ? 'text.currentUser' : 'text.primary',
                }}
              >
                {message.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: 'sm',
                  color: message.username === username ? 'text.currentUser' : 'text.primary',
                }}
              >
                {message.content}
              </Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Messages;
