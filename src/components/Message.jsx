import { ListItem, ListItemContent, Typography } from '@mui/joy';

const Message = ({ username, content, byCurrentUser }) => (
  <ListItem
    sx={{
      maxWidth: 500,
      minWidth: 50,
      py: 1,
      px: 2,
      // alignSelf: byCurrentUser ? 'flex-end' : 'flex-start',
      alignSelf: 'flex-start',
      bgcolor: byCurrentUser ? 'background.currentUser' : 'background.componentBg',
      border: '1px solid',
      borderRadius: 24,
      borderColor: 'divider',
    }}
  >
    <ListItemContent>
      <Typography
        sx={{
          fontSize: 'sm',
          fontWeight: 'lg',
          color: byCurrentUser ? 'text.currentUser' : 'text.primary',
        }}
      >
        {username}
      </Typography>
      <Typography
        sx={{
          fontSize: 'sm',
          color: byCurrentUser ? 'text.currentUser' : 'text.primary',
        }}
      >
        {content}
      </Typography>
    </ListItemContent>
  </ListItem>
);

export default Message;
