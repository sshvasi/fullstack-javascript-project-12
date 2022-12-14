export const getDateParts = (timestamp) => {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const parts = formatter
    .formatToParts(date)
    .filter(({ type }) => type !== 'literal')
    .reduce(
      (acc, { type, value }) => ({
        ...acc,
        [type]: value,
      }),
      {},
    );
  return parts;
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return formatter.format(date);
};
