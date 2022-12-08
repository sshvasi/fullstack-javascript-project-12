const { useGetMessagesQuery } = require('@/slices/apiSlice');

const useActiveMessages = (selectedChannelId) => {
  const { messages, isLoading } = useGetMessagesQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      messages:
        data?.messages
          .filter((message) => message.channelId === selectedChannelId)
          .sort((message1, message2) => (message1.date > message2.date ? 1 : -1)) ?? [],
      isMessagesLoading: isLoading,
      isMessagesError: isError,
    }),
  });

  return { messages, isLoading };
};

export default useActiveMessages;
