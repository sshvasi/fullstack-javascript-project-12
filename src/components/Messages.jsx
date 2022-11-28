import { List, ListItem, Sheet } from '@mui/joy';

import { MONTHS, parseDate } from '@/utils/dates';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import MessagesBage from '@/components/MessagesBage';
import MessagesDate from '@/components/MessagesDate';
import MessageList from '@/components/MessageList';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';

const Messages = () => {
  const { selectedChannel, selectedChannelId } = useGetChannelsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedChannelId: data?.currentChannelId ?? null,
      selectedChannel:
        data?.channels.find((channel) => channel.id === data?.currentChannelId) ?? {},
    }),
  });

  const { messages } = useGetMessagesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      messages:
        data?.messages
          .filter((message) => message.channelId === selectedChannelId)
          .sort((message1, message2) => (message1.date > message2.date ? 1 : -1)) ?? [],
    }),
  });

  const messagesGrouppedByDate = messages.reduce((acc, message) => {
    const { year, month, day } = parseDate(message.date);
    const key = `${year}_${month}_${day}`;
    const group = acc[key] || [];
    return { ...acc, [key]: [...group, message] };
  }, {});

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

  const autoScrollRef = useScrollToBottom(messages.length, selectedChannelId);

  return (
    <>
      <MessagesBage channelName={selectedChannel.name} messagesCount={messages.length} />
      <Sheet
        ref={autoScrollRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <List>{renderedMessages}</List>
      </Sheet>
    </>
  );
};

export default Messages;
