import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';

import { removeUser } from '@/slices/authSlice';
import { openDrawer } from '@/slices/drawerSlice';
import ColorSchemeToggle from '@/components/Layout/ColorSchemeToggle';

const Header = ({ sx = [], ...props }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          position: 'sticky',
          top: 0,
          zIndex: 110,
          gridColumn: '1 / -1',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid',
          p: 2,
          bgcolor: 'background.componentBg',
          borderColor: 'divider',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton
          aria-label="Open menu with channel list"
          variant="outlined"
          size="sm"
          onClick={handleOpenDrawer}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <IconButton
            aria-label="Go to home page"
            size="sm"
            variant="solid"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <ChatIcon />
          </IconButton>
        </Link>
        <Typography component="h1" fontWeight="xl">
          Chat
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button size="sm" variant="outlined" onClick={handleLogout}>
          Log out
        </Button>
        <ColorSchemeToggle />
      </Box>
    </Box>
  );
};

export default Header;
