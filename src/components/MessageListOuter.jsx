import { List, ListItem, Sheet } from '@mui/joy';

import MessagesDate from '@/components/MessagesDate';
import MessageListInner from '@/components/MessageListInner';

const MessageListOuter = ({ messagesGrouppedByDate, currentUsername, autoScrollRef }) => {
  let currentYear = null;

  return (
    <Sheet
      ref={autoScrollRef}
      sx={{
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
