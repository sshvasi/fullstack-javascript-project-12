import { useDispatch } from 'react-redux';
import { Box, Button, List } from '@mui/joy';

import { apiSlice, useGetChannelsQuery } from '@/slices/apiSlice';
import { openModal } from '@/slices/modalsSlice';
import Channel from '@/components/Channel';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();

  const handleSelectChannel = (id) => () => {
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
    dispatch(openModal({ type: 'removing', extra: { channelId: id } }));
  };

  const handleRenameChannel = (id) => () => {
    dispatch(openModal({ type: 'renaming', extra: { channelId: id } }));
  };

  const renderedChannels = channels?.channels.map(({ id, name, removable }) => (
    <Channel
      key={id}
      id={id}
      name={name}
      selected={id === channels?.currentChannelId}
      removable={removable}
      onSelect={handleSelectChannel(id)}
      onRename={handleRenameChannel(id)}
      onRemove={handleRemoveChannel(id)}
    />
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Button size="md" variant="outlined" onClick={handleAddChannel()}>
        New channel
      </Button>
      <List
        size="sm"
        sx={{
          '--List-gap': '2px',
        }}
      >
        {renderedChannels}
      </List>
    </Box>
  );
};

export default Channels;
