import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/joy';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import MessagesBage from '@/components/messages/MessagesBage';
import MessageListOuter from '@/components/messages/MessageListOuter';
import MessageForm from '@/components/messages/MessageForm';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import useGroupByDate from '@/hooks/useGroupByDate';
import useSelectedChannel from '@/hooks/useSelectedChannel';
import useActiveMessages from '@/hooks/useActiveMessages';

const MessagesSection = () => {
  const { t } = useTranslation();
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { selectedChannel, selectedChannelId, isChannelLoading, isChannelError } =
    useSelectedChannel();
  const { messages, isMessagesLoading, isMessagesError } = useActiveMessages(selectedChannelId);
  const { messagesGrouppedByDate } = useGroupByDate(messages);
  const autoScrollRef = useScrollToBottom(messages.length, selectedChannelId);

  let messagesContent = null;

  if (isMessagesLoading || isChannelLoading) {
    messagesContent = (
      <CircularProgress
        color="primary"
        variant="soft"
        size="md"
        sx={{ my: 20, mx: 'auto', flexGrow: 1 }}
      />
    );
  } else if (isChannelError || isMessagesError) {
    toast.error(t('errors.network'), { toastId: t('errors.network') });
    messagesContent = (
      <Typography
        component="p"
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {t('errors.network')}
      </Typography>
    );
  } else {
    messagesContent = (
      <MessageListOuter
        messagesGrouppedByDate={messagesGrouppedByDate}
        currentUsername={currentUsername}
        autoScrollRef={autoScrollRef}
      />
    );
  }

  return (
    <>
      <MessagesBage channelName={selectedChannel.name} messagesCount={messages.length} />
      {messagesContent}
      <MessageForm />
    </>
  );
};

export default MessagesSection;
