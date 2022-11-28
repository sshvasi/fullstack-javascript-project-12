import { useEffect, useState } from 'react';
import { IconButton, Tooltip, useColorScheme } from '@mui/joy';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }

  return (
    <Tooltip title={mode === 'light' ? 'Turn on dark theme' : 'Turn on light theme'} size="sm">
      <IconButton
        aria-label="Toggle color mode"
        id="toggle-mode"
        size="sm"
        variant="outlined"
        color="primary"
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
