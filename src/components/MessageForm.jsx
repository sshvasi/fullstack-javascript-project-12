import { Box, IconButton, Textarea } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';

const MessageForm = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      width: '100%',
      maxHeight: '200px',
      borderTop: '1px solid',
      p: 2,
      bgcolor: 'background.componentBg',
      borderColor: 'divider',
    }}
  >
    <Box sx={{ width: '100%', maxHeight: '200px' }}>
      <Textarea autoFocus placeholder="Write a messsage..." color="neutral" maxRows={5} size="md" />
    </Box>
    <IconButton variant="plain" color="primary">
      <SendIcon />
    </IconButton>
  </Box>
);

export default MessageForm;
