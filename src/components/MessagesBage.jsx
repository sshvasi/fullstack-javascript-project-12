import { Box, Typography } from '@mui/joy';

const MessagesBage = ({ channelName, messagesCount }) => {
  const isNoMessages = messagesCount === 0;
  const isAnyMessages = messagesCount !== 0;
  const isManyMessages = messagesCount > 0;

  const messagesCountBage = (
    <>
      {isAnyMessages && messagesCount}
      {isNoMessages ? 'No messages' : isManyMessages ? ' messages' : ' message'}
    </>
  );

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
      {channelName}
    </Typography>
    <Typography level="body3">{messagesCountBage}</Typography>
  </Box>;
};

export default MessagesBage;
