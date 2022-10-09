import { useContext } from 'react';
import { Box, useTheme, IconButton, Typography } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ColorModeContext from './context/ColorModeContext';

const App = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {theme.palette.mode} mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error rerum
        suscipit veniam? Consequatur minus laudantium, doloribus, in ad fugit
        quae ea voluptatem quasi ducimus deserunt, blanditiis ratione itaque
        alias placeat adipisci nobis. Quia neque reprehenderit sunt animi, ullam
        nulla minus quae reiciendis sapiente, fuga ratione iusto debitis omnis
        similique aspernatur! Dolore cupiditate expedita tenetur ratione
        necessitatibus, inventore nam facilis hic sapiente itaque corrupti
        repellat ut mollitia dolor incidunt qui sed aut soluta error nulla? Ex,
        ullam, ipsam dolorum error ipsa, ut vero laboriosam commodi qui enim
        consequuntur suscipit iure molestias tempora velit neque necessitatibus
        et quaerat magni perspiciatis officia cum!
      </Typography>
    </Box>
  );
};

export default App;
