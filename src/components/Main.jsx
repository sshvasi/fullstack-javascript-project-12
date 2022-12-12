import { Box } from '@mui/joy';

const Main = ({ children }) => (
  <Box
    component="main"
    className="Main"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.appBody',
      overflow: 'auto',
    }}
  >
    {children}
  </Box>
);

export default Main;
