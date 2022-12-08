import { List } from '@mui/joy';

import Channel from '@/components/channels/Channel';

const ChannelList = ({
  channels,
  handleSelectChannel,
  handleRenameChannel,
  handleRemoveChannel,
}) => (
  <List
    size="sm"
    sx={{
      '--List-gap': '2px',
    }}
  >
    {channels.map(({ id, name, removable }) => (
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
    ))}
  </List>
);

export default ChannelList;
