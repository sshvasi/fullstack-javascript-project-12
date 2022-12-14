import { Fragment } from 'react';
import { List, ListDivider } from '@mui/joy';

import Channel from '@/components/channels/Channel';

const ChannelList = ({
  channels,
  currentChannelId,
  handleSelectChannel,
  handleRenameChannel,
  handleRemoveChannel,
}) => (
  <List
    size="md"
    sx={{
      p: 0,
    }}
  >
    {channels.map(({ id, name, removable }) => (
      <Fragment key={id}>
        <Channel
          id={id}
          name={name}
          selected={id === currentChannelId}
          removable={removable}
          onSelect={handleSelectChannel(id)}
          onRename={handleRenameChannel(id)}
          onRemove={handleRemoveChannel(id)}
        />
        <ListDivider sx={{ m: 0 }} />
      </Fragment>
    ))}
  </List>
);

export default ChannelList;
