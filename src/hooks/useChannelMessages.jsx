import { useMemo } from 'react';
import { useGetChannelsQuery, useGetMessagesQuery } from '@/slices/apiSlice';

const useChannelMessages = () => {
  const { data: messagesData } = useGetMessagesQuery();
  const { data: channelsData } = useGetChannelsQuery();

  const selectedChannel = useMemo(
    () =>
      channelsData?.channels.find(
        (c) => c.id === channelsData?.currentChannelId,
      ),
    [channelsData],
  );

  const messages = useMemo(
    () =>
      messagesData?.messages
        .filter((m) => m.channelId === channelsData?.currentChannelId)
        .sort((a, b) => (a.date > b.date ? 1 : -1)),
    [channelsData?.currentChannelId, messagesData?.messages],
  );

  return { messages, selectedChannel };
};

export default useChannelMessages;
