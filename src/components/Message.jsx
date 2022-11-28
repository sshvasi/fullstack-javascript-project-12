import { memo } from 'react';
import { Box, ListItem, ListItemContent, Typography } from '@mui/joy';

import { formatTime } from '@/utils/dates';

const Message = ({ username, content, byCurrentUser, hours, minutes }) => (
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
          level="body3"
          fontSize="xs"
          fontStyle="italic"
          sx={{
            color: byCurrentUser
              ? 'var(--joy-palette-neutral-200)'
              : 'var(--joy-palette-neutral-400)',
          }}
        >
          {formatTime({ hours, minutes })}
        </Typography>
      </Box>
    </ListItemContent>
  </ListItem>
);

export default memo(Message);
