import { memo } from 'react';
import { Box, ListItem, ListItemContent, Typography } from '@mui/joy';
import { formatTime } from '@/utils/dates';

const Message = ({ username, content, time, byCurrentUser }) => (
  <ListItem
    sx={{
      maxWidth: 500,
      minWidth: 50,
      py: 1,
      px: 2,
      alignSelf: {
        xs: byCurrentUser ? 'flex-end' : 'flex-start',
        lg: 'flex-start',
      },
      bgcolor: byCurrentUser ? 'background.active' : 'background.inactive',
      borderRadius: 'xl',
    }}
  >
    <ListItemContent>
      <Typography
        fontSize="sm"
        fontWeight="lg"
        sx={{
          color: byCurrentUser ? 'text.active' : 'text.inactive',
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
            color: byCurrentUser ? 'text.active' : 'text.inactive',
            wordBreak: 'break-word',
          }}
        >
          {content}
        </Typography>
        <Typography
          fontSize="xs"
          sx={{
            color: byCurrentUser
              ? 'var(--joy-palette-neutral-200)'
              : 'var(--joy-palette-text-tertiary)',
          }}
        >
          {formatTime(time)}
        </Typography>
      </Box>
    </ListItemContent>
  </ListItem>
);

export default memo(Message);
