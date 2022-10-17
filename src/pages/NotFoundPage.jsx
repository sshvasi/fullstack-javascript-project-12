import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const NotFoundPage = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Typography variant="h1" component="h1">
      404
    </Typography>
    <Typography variant="h6" component="p" mb={2} textAlign="center">
      The page you’re&nbsp;looking&nbsp;for doesn’t&nbsp;exist.
    </Typography>
    <Button component={Link} to="/" variant="contained">
      Back Home
    </Button>
  </Box>
);

export default NotFoundPage;
