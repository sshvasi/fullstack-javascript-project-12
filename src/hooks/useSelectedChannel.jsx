import { useGetChannelsQuery } from '@/slices/apiSlice';

const useSelectedChannel = () => {
  const { selectedChannel, selectedChannelId, isChannelLoading, isChannelError } =
    useGetChannelsQuery(undefined, {
      selectFromResult: ({ data, isError, isLoading }) => ({
        selectedChannelId: data?.currentChannelId ?? null,
        selectedChannel:
          data?.channels.find((channel) => channel.id === data?.currentChannelId) ?? {},
        isChannelLoading: isLoading,
        isChannelError: isError,
      }),
    });

  return { selectedChannel, selectedChannelId, isChannelLoading, isChannelError };
};

export default useSelectedChannel;
