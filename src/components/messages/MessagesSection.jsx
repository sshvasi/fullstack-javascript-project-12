import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/joy';

import MessagesBage from '@/components/messages/MessagesBage';
import MessageListOuter from '@/components/messages/MessageListOuter';
import MessageForm from '@/components/messages/MessageForm';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import useGroupByDate from '@/hooks/useGroupByDate';
import useSelectedChannel from '@/hooks/useSelectedChannel';
import useActiveMessages from '@/hooks/useActiveMessages';

const MessagesSection = () => {
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { selectedChannel, selectedChannelId } = useSelectedChannel();
  const { messages, isLoading } = useActiveMessages(selectedChannelId);
  const { messagesGrouppedByDate } = useGroupByDate(messages);
  const autoScrollRef = useScrollToBottom(messages.length, selectedChannelId);

  return (
    <>
      <MessagesBage channelName={selectedChannel.name} messagesCount={messages.length} />
      {isLoading ? (
        <CircularProgress
          color="primary"
          variant="soft"
          size="md"
          sx={{ my: 20, mx: 'auto', flexGrow: 1 }}
        />
      ) : (
        <MessageListOuter
          messagesGrouppedByDate={messagesGrouppedByDate}
          currentUsername={currentUsername}
          autoScrollRef={autoScrollRef}
        />
      )}
      <MessageForm />
    </>
  );
};

export default MessagesSection;