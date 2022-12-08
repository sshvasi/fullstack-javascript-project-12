import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, IconButton, Tooltip, Typography, Link } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';

import { removeUser } from '@/slices/authSlice';
import { openDrawer } from '@/slices/drawerSlice';
import ColorSchemeToggle from '@/components/layout/ColorSchemeToggle';

const Header = () => {
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
      sx={{
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
      }}
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
          variant="outlined"
          size="sm"
          onClick={handleOpenDrawer}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', gap: 2 }}>
          <IconButton size="sm" variant="solid" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            <ChatIcon />
          </IconButton>
          <Typography component="h1" level="h4" fontWeight="xl">
            {t('header.logo')}
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Tooltip title={t('header.github')} size="sm">
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
        <Tooltip title={t('header.button')} size="sm">
          <Button
            size="sm"
            variant="outlined"
            onClick={handleLogout}
            startDecorator={<LogoutIcon />}
          >
            {t('header.button')}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
