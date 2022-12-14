import { useEffect, useState } from 'react';
import { IconButton, Tooltip, useColorScheme } from '@mui/joy';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useTranslation } from 'react-i18next';

const ColorSchemeToggle = () => {
  const { t } = useTranslation();
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }

  return (
    <Tooltip title={mode === 'light' ? t('header.dark') : t('header.light')} size="sm">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ColorSchemeToggle;
