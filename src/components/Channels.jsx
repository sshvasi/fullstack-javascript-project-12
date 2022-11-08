import { List, ListItem, ListItemButton, ListItemContent, Typography } from '@mui/joy';

const Channels = () => {
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
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemContent>General</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemContent>Personal</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemContent>Random</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
};

export default Channels;
