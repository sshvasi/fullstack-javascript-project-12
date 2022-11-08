import { Box } from '@mui/joy';

const Root = ({ drawerOpen, sx = [], ...props }) => (
  <Box
    {...props}
    sx={[
      {
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
          md: 'minmax(160px, 300px) minmax(500px, 1fr)',
        },
        gridTemplateRows: '64px 1fr',
        minHeight: '100vh',
        bgcolor: 'background.appBody',
      },
      drawerOpen && {
        height: '100vh',
        overflow: 'hidden',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
);

export default Root;
