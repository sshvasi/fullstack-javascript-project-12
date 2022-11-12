import { Box, List, ListItem, ListItemContent, Typography } from '@mui/joy';

import useScrollBottom from '@/hooks/useScrollBottom';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';

const Messages = () => {
  const { data: messagesData } = useGetMessagesQuery();
  const { data: channelsData } = useGetChannelsQuery();

  const ref = useScrollBottom(messagesData);

  return (
    <Box
      sx={{
        px: 3,
        flexGrow: 1,
        overflow: 'auto',
      }}
      ref={ref}
    >
      <List sx={{ maxWidth: 480, '--List-item-radius': '24px' }}>
        {messagesData?.messages
          .filter((message) => message.currentChannelId === channelsData?.currentChannelId)
          .map((message) => (
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
                <Typography sx={{ fontSize: 'sm', fontWeight: 'lg' }}>
                  {message.username}
                </Typography>
                <Typography sx={{ fontSize: 'sm' }}>{message.content}</Typography>
              </ListItemContent>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Messages;
