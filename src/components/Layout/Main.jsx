import { Box } from '@mui/joy';

const Main = ({ sx = [], ...props }) => (
  <Box
    component="main"
    className="Main"
    {...props}
    sx={[
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.appBody',
        overflow: 'auto',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
);

export default Main;
