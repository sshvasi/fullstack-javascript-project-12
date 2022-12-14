import { Box } from '@mui/joy';

import use100vh from '@/hooks/use100vh';

const Root = ({ children }) => {
  const height = use100vh();

  return (
    <Box
      sx={{
        height: height ? `${height}px` : '100vh',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(64px, 250px) minmax(400px, 1fr)',
          md: 'minmax(160px, 300px) minmax(500px, 1fr)',
        },
        gridTemplateRows: '64px 1fr',
        bgcolor: 'background.body',
      }}
    >
      {children}
    </Box>
  );
};

export default Root;
