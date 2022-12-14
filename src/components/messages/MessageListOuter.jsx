import { List, ListItem, Sheet } from '@mui/joy';

import MessagesDate from '@/components/messages/MessagesDate';
import MessageListInner from '@/components/messages/MessageListInner';

const MessageListOuter = ({ messagesGrouppedByDate, currentUsername, autoScrollRef }) => {
  let currentYear = null;

  return (
    <Sheet
      ref={autoScrollRef}
      sx={{
        display: 'flex',
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <List>
        {messagesGrouppedByDate.map(({ date, items: currentDateMessages }) => {
          const [year, month, day] = date.split('_');
          const isCurrentYear = year === currentYear;

          currentYear = year;

          return (
            <ListItem
              key={date}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                p: 0,
              }}
            >
              <MessagesDate year={year} month={month} day={day} isCurrentYear={isCurrentYear} />
              <MessageListInner messages={currentDateMessages} currentUsername={currentUsername} />
            </ListItem>
          );
        })}
      </List>
    </Sheet>
  );
};

export default MessageListOuter;
