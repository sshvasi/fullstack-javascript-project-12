/* eslint-disable no-param-reassign */
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Box, Button, CircularProgress, Typography } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

import { apiSlice, useGetChannelsQuery } from '@/slices/apiSlice';
import { openModal } from '@/slices/modalsSlice';
import { closeDrawer } from '@/slices/drawerSlice';
import ChannelList from '@/components/channels/ChannelList';

const ChannelsSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data: channels,
    isLoading: isChannelsLoading,
    isError: isChannelsError,
  } = useGetChannelsQuery();
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

  let channelsContent = null;

  if (isChannelsLoading) {
    channelsContent = (
      <CircularProgress color="primary" variant="soft" size="md" sx={{ my: 5, mx: 'auto' }} />
    );
  } else if (isChannelsError) {
    toast.error(t('errors.network'), { toastId: t('errors.network') });
    channelsContent = (
      <Typography component="p" textAlign="center" mt={2}>
        {t('errors.network')}
      </Typography>
    );
  } else {
    channelsContent = (
      <ChannelList
        channels={channels?.channels}
        currentChannelId={channels?.currentChannelId}
        handleSelectChannel={handleSelectChannel}
        handleRenameChannel={handleRenameChannel}
        handleRemoveChannel={handleRemoveChannel}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {channelsContent}
      <Button
        size="lg"
        color="neutral"
        variant="plain"
        onClick={handleAddChannel()}
        startDecorator={<AddIcon />}
        sx={{
          mx: 1,
        }}
      >
        {t('channels.buttons.add')}
      </Button>
    </Box>
  );
};

export default ChannelsSection;
