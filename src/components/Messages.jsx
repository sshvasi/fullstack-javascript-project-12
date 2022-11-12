import { Box, List, ListItem, ListItemContent, Typography } from '@mui/joy';

import useScrollToBottom from '@/hooks/useScrollToBottom';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';

const Messages = () => {
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
      <List sx={{ maxWidth: 480, '--List-item-radius': '24px' }}>
        {activeChannelMessages?.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              mb: 2,
              py: 1,
              px: 2,
              bgcolor: 'background.componentBg',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <ListItemContent key={message.id}>
              <Typography sx={{ fontSize: 'sm', fontWeight: 'lg' }}>{message.username}</Typography>
              <Typography sx={{ fontSize: 'sm' }}>{message.content}</Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Messages;
