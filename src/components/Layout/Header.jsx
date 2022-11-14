import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, IconButton, Link, Tooltip, Typography } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';

import { removeUser } from '@/slices/authSlice';
import { openDrawer } from '@/slices/drawerSlice';
import ColorSchemeToggle from '@/components/Layout/ColorSchemeToggle';

const Header = ({ sx = [], ...props }) => {
  const { t } = useTranslation();
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
        <RouterLink to="/">
          <IconButton
            aria-label="Go to home page"
            size="sm"
            variant="solid"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <ChatIcon />
          </IconButton>
        </RouterLink>
        <Typography component="h1" level="h4" fontWeight="xl">
          {t('heading')}
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
        <Tooltip title="Github repository" size="sm">
          <IconButton
            size="sm"
            variant="outlined"
            component="a"
            href="https://github.com/sshvasi/chat"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <ColorSchemeToggle />
        <Tooltip title="Log out" size="sm">
          <IconButton size="sm" variant="outlined" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
