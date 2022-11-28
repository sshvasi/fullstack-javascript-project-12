import { memo } from 'react';
import { Box, ListItem, ListItemContent, Typography } from '@mui/joy';

const Message = ({ username, content, time, byCurrentUser }) => (
  <ListItem
    sx={{
      maxWidth: 500,
      minWidth: 50,
      py: 1,
      px: 2,
      alignSelf: byCurrentUser ? 'flex-end' : 'flex-start',
      bgcolor: byCurrentUser ? 'background.currentUser' : 'background.anotherUser',
      borderRadius: 24,
    }}
  >
    <ListItemContent>
      <Typography
        fontSize="sm"
        fontWeight="lg"
        sx={{
          color: byCurrentUser ? 'text.currentUser' : 'text.primary',
        }}
      >
        {username}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        <Typography
          fontSize="sm"
          sx={{
            color: byCurrentUser ? 'text.currentUser' : 'text.primary',
          }}
        >
          {content}
        </Typography>
        <Typography
          fontSize="xs"
          sx={{
            color: byCurrentUser
              ? 'var(--joy-palette-neutral-300)'
              : 'var(--joy-palette-text-tertiary)',
          }}
        >
          {time}
        </Typography>
      </Box>
    </ListItemContent>
  </ListItem>
);

export default memo(Message);
