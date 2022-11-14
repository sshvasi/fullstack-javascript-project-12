import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/joy';

const MessagesBage = ({ channelName, messagesCount }) => {
  const { t } = useTranslation();

  const isNoMessages = messagesCount === 0;
  const isManyMessages = messagesCount > 1;

  const messagesCountBage = isNoMessages
    ? t('chat.messages_zero')
    : isManyMessages
    ? ` ${t('chat.messages_many', { count: messagesCount })}`
    : ` ${t('chat.messages_one', { count: messagesCount })}`;

  return (
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
    </Box>
  );
};

export default MessagesBage;
