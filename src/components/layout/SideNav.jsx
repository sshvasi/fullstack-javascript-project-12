import { Box } from '@mui/joy';

const SideNav = ({ children }) => (
  <Box
    component="nav"
    className="Navigation"
    sx={{
      display: {
        xs: 'none',
        sm: 'initial',
      },
      borderRight: '1px solid',
      // p: 2,
      bgcolor: 'background.body',
      borderColor: 'divider',
      overflow: 'auto',
    }}
  >
    {children}
  </Box>
);

export default SideNav;
