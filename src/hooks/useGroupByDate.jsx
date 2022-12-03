import { parseDate } from '@/utils/dates';

const useGroupByDate = (messages) => {
  const messagesGrouppedByDate = messages.reduce((acc, message) => {
    const { year, month, day } = parseDate(message.date);
    const key = `${year}_${month}_${day}`;
    const group = acc[key] || [];
    return { ...acc, [key]: [...group, message] };
  }, {});

  return { messagesGrouppedByDate };
};

export default useGroupByDate;
