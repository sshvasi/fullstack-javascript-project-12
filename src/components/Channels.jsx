import { List, ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy';

import { useGetChannelsQuery } from '@/slices/apiSlice';

const Channels = () => {
  const { data: channelsData } = useGetChannelsQuery();

  return (
    <List size="sm" sx={{ '--List-item-radius': '8px' }}>
      <ListItem nested sx={{ p: 0 }}>
        <Typography
          textColor="neutral.500"
          fontWeight={700}
          sx={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '.1rem',
          }}
        >
          Channels
        </Typography>
        <List
          sx={{
            mt: 1,
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          {channelsData?.channels.map((channel) => (
            <ListItem key={channel.id}>
              <ListItemButton
                variant={channel.id === channelsData?.currentChannelId ? 'soft' : 'plain'}
                color={channel.id === channelsData?.currentChannelId ? 'neutral' : 'neutral'}
              >
                <ListItemContent>{channel.name}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ListItem>
    </List>
  );
};

export default Channels;
