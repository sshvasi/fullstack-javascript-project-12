import { getDateParts } from '@/utils/dates';

const useGroupByDate = (messages) => {
  const messagesGrouppedByDate = messages.reduce((acc, message) => {
    const { year, month, day } = getDateParts(message.date);
    const date = `${year}_${month}_${day}`;
    const group = acc.find((item) => item.date === date);
    if (!group) return [...acc, { date, items: [message] }];
    group.items.push(message);
    return acc;
  }, []);

  return { messagesGrouppedByDate };
};

export default useGroupByDate;
