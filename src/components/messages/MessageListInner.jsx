import { List } from '@mui/joy';

import Message from '@/components/messages/Message';

const MessageListInner = ({ messages, currentUsername }) => (
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
    {messages.map(({ id, username, content, date }) => (
      <Message
        key={id}
        time={date}
        content={content}
        username={username}
        byCurrentUser={username === currentUsername}
      />
    ))}
  </List>
);

export default MessageListInner;
