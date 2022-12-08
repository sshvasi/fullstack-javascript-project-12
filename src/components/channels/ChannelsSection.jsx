/* eslint-disable no-param-reassign */
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress } from '@mui/joy';

import { apiSlice, useGetChannelsQuery } from '@/slices/apiSlice';
import { openModal } from '@/slices/modalsSlice';
import { closeDrawer } from '@/slices/drawerSlice';
import ChannelList from '@/components/channels/ChannelList';

const ChannelsSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels, isLoading } = useGetChannelsQuery();
  const isDrawerOpen = useSelector((state) => state.drawer.isOpened);

  const handleSelectChannel = (id) => () => {
    // Channels render in both drawer and sidebar,
    // if user select channel from drawer, close it.
    if (isDrawerOpen) {
      dispatch(closeDrawer());
    }

    dispatch(
      apiSlice.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.currentChannelId = id;
      }),
    );
  };

  const handleAddChannel = () => () => {
    dispatch(openModal({ type: 'adding' }));
  };

  const handleRemoveChannel = (id) => () => {
    dispatch(openModal({ type: 'removing', channelId: id }));
  };

  const handleRenameChannel = (id) => () => {
    dispatch(openModal({ type: 'renaming', channelId: id }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Button size="md" variant="outlined" onClick={handleAddChannel()}>
        {t('channels.buttons.add')}
      </Button>
      {isLoading ? (
        <CircularProgress color="primary" variant="soft" size="md" sx={{ my: 5, mx: 'auto' }} />
      ) : (
        <ChannelList
          channels={channels?.channels}
          handleSelectChannel={handleSelectChannel}
          handleRenameChannel={handleRenameChannel}
          handleRemoveChannel={handleRemoveChannel}
        />
      )}
    </Box>
  );
};

export default ChannelsSection;
