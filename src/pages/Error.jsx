import { useRouteError, Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/joy';
import { Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Grid from '@/components/layout/Grid';

const Error = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  return (
    <Grid>
      <Typography level="h1" component="h1">
        {t('404.title')}
      </Typography>
      <Typography level="body" component="p">
        {t('404.description')}
      </Typography>
      <Typography level="body2" component="p">
        {error.statusText || error.message}
      </Typography>
      <Link
        color="primary"
        level="h3"
        underline="hover"
        component={RouterLink}
        to="/"
      >
        {t('404.button')}
      </Link>
    </Grid>
  );
};

export default Error;
