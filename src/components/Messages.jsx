import { Box, List, ListItem, ListItemButton, ListItemContent, Sheet, Typography } from '@mui/joy';

const Messages = () => (
  <Box
    sx={{
      p: 2,
      flexGrow: 1,
      overflow: 'auto',
    }}
  >
    <List sx={{ maxWidth: 480, '--List-item-radius': '24px' }}>
      <ListItem
        sx={{
          mb: 2,
          py: 1,
          px: 2,
          bgcolor: 'background.componentBg',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ListItemContent>
          <Typography sx={{ mb: 0.5, fontSize: 'sm', fontWeight: 'lg' }}>username</Typography>
          <Typography sx={{ fontSize: 'sm' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, temporibus.
          </Typography>
        </ListItemContent>
      </ListItem>
      <ListItem
        sx={{
          mb: 2,
          py: 1,
          px: 2,
          bgcolor: 'background.componentBg',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ListItemContent>
          <Typography sx={{ mb: 0.5, fontSize: 'sm', fontWeight: 'lg' }}>username</Typography>
          <Typography sx={{ fontSize: 'sm' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, suscipit. Laborum
            quisquam, labore ipsum tenetur vero modi excepturi minus laudantium nulla. Tenetur iusto
            aliquid numquam perferendis. Sapiente repellendus ab quasi aliquam harum debitis impedit
            ex maxime fugit. Veritatis repellat eligendi excepturi et odio architecto dolor quos
            aspernatur totam. Dolorum ad labore ullam ipsam error perspiciatis dolore, magni quia
            vel sint nulla at explicabo itaque. Sint id officiis itaque ut sequi, facilis recusandae
            dolorum sit voluptatibus!
          </Typography>
        </ListItemContent>
      </ListItem>
      <ListItem
        sx={{
          mb: 2,
          py: 1,
          px: 2,
          bgcolor: 'background.componentBg',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ListItemContent>
          <Typography sx={{ mb: 0.5, fontSize: 'sm', fontWeight: 'lg' }}>username</Typography>
          <Typography sx={{ fontSize: 'sm' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui voluptas beatae
            illo. Assumenda molestias consequatur, autem, perspiciatis illo accusantium sequi
            quibusdam consectetur, deleniti accusamus dignissimos eius dicta ut fugiat. Dicta nobis
            quas ullam labore, incidunt vero perspiciatis explicabo, odit iste temporibus maxime
            earum velit culpa? Dolore obcaecati nam quia!
          </Typography>
        </ListItemContent>
      </ListItem>
    </List>
  </Box>
);

export default Messages;
