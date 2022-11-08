import { Box } from '@mui/joy';

const SideNav = ({ sx = [], ...props }) => (
  <Box
    component="nav"
    className="Navigation"
    {...props}
    sx={[
      {
        display: {
          xs: 'none',
          sm: 'initial',
        },
        borderRight: '1px solid',
        p: 2,
        bgcolor: 'background.componentBg',
        borderColor: 'divider',
        overflow: 'auto',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
);

export default SideNav;
