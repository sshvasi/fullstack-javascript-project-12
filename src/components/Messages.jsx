import { CircularProgress, List, ListItem, Sheet } from '@mui/joy';

import MessagesBage from '@/components/MessagesBage';
import MessagesDate from '@/components/MessagesDate';
import MessageList from '@/components/MessageList';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import useGroupByDate from '@/hooks/useGroupByDate';
import useSelectedChannel from '@/hooks/useSelectedChannel';
import useActiveMessages from '@/hooks/useActiveMessages';
import { MONTHS } from '@/utils/dates';

const Messages = () => {
  const { selectedChannel, selectedChannelId } = useSelectedChannel();
  const { messages, isLoading } = useActiveMessages(selectedChannelId);
  const { messagesGrouppedByDate } = useGroupByDate(messages);
  const autoScrollRef = useScrollToBottom(messages.length, selectedChannelId);

  let currentYear = null;

  const renderedMessages = Object.entries(messagesGrouppedByDate).map(
    ([date, currentDateMessages]) => {
      const [year, month, day] = date.split('_');
      const isCurrentYear = year === currentYear;

      currentYear = year;

      return (
        <ListItem
          key={date}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 0,
          }}
        >
          <MessagesDate year={year} month={MONTHS[month]} day={day} isCurrentYear={isCurrentYear} />
          <MessageList messages={currentDateMessages} />
        </ListItem>
      );
    },
  );

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
        <Sheet
          ref={autoScrollRef}
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <List>{renderedMessages}</List>
        </Sheet>
      )}
    </>
  );
};

export default Messages;
