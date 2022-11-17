import { useSelector } from 'react-redux';
import { List, Sheet } from '@mui/joy';

import { months } from '@/utils/dates';
import useChannelMessages from '@/hooks/useChannelMessages';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import Message from '@/components/Message';
import MessagesBage from '@/components/MessagesBage';
import MessagesDate from './MessagesDate';

const Messages = () => {
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { messages, selectedChannel } = useChannelMessages();
  const autoScrollRef = useScrollToBottom(messages, selectedChannel);

  let currentMonth = null;
  let currentYear = null;

  const renderedMessages = [];

  messages?.forEach(({ id, username, content, date: timestamp }) => {
    const date = new Date(timestamp);
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (month !== currentMonth) {
      renderedMessages.push(
        <MessagesDate
          key={timestamp}
          year={year}
          month={month}
          day={months[month]}
          currentYear={currentYear}
          byCurrentUser={username === currentUsername}
        />,
      );
    }

    renderedMessages.push(
      <Message
        key={id}
        username={username}
        content={content}
        hours={hours}
        minutes={minutes}
        byCurrentUser={username === currentUsername}
      />,
    );

    currentYear = year;
    currentMonth = month;
  });

  return (
    <>
      <MessagesBage
        channelName={selectedChannel?.name}
        messagesCount={messages?.length}
      />
      <Sheet ref={autoScrollRef} sx={{ overflow: 'auto' }}>
        <List
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 3,
          }}
        >
          {renderedMessages}
        </List>
      </Sheet>
    </>
  );
};

export default Messages;
