import { useSelector } from 'react-redux';
import { List } from '@mui/joy';

import { formatTime, parseDate } from '@/utils/dates';
import Message from '@/components/Message';

const MessageList = ({ messages }) => {
  const { username: currentUsername } = useSelector((state) => state.auth);

  const renderedMessages = messages.map(({ id, username, content, date }) => {
    const { hours, minutes } = parseDate(date);
    const time = formatTime(hours, minutes);

    return (
      <Message
        key={id}
        time={time}
        content={content}
        username={username}
        byCurrentUser={username === currentUsername}
      />
    );
  });

  return (
    <List
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 1,
        overflow: 'auto',
        py: 1,
        px: 2,
      }}
    >
      {renderedMessages}
    </List>
  );
};

export default MessageList;
