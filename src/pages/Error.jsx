import { useRouteError, Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/joy';
import { Link } from '@mui/material';

import Grid from '@/components/Layout/Grid';

const Error = () => {
  const error = useRouteError();

  return (
    <Grid>
      <Typography level="h1" component="h1">
        Oops!
      </Typography>
      <Typography level="body" component="p">
        Sorry, an unexpected error has occured
      </Typography>
      <Typography level="body2" component="p">
        {error.statusText || error.message}
      </Typography>
      <Link color="primary" level="h3" underline="hover" component={RouterLink} to="/">
        Home
      </Link>
    </Grid>
  );
};

export default Error;
