import { useGetChannelsQuery } from '@/slices/apiSlice';

const useSelectedChannel = () => {
  const { selectedChannel, selectedChannelId } = useGetChannelsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedChannelId: data?.currentChannelId ?? null,
      selectedChannel:
        data?.channels.find((channel) => channel.id === data?.currentChannelId) ?? {},
    }),
  });

  return { selectedChannel, selectedChannelId };
};

export default useSelectedChannel;
