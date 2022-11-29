import { useRouteError, Link as RouterLink } from 'react-router-dom';
import { Typography, Link } from '@mui/joy';
import { useTranslation } from 'react-i18next';

import Grid from '@/components/layout/Grid';

const Error = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  console.log(error.statusText || error.message);

  return (
    <Grid>
      <Typography level="h1" component="h1">
        {t('404.header')}
      </Typography>
      <Typography level="h6" component="p">
        {t('404.description')}
      </Typography>
      <Link color="primary" level="h6" underline="none" component={RouterLink} to="/">
        {t('404.button')}
      </Link>
    </Grid>
  );
};

export default Error;
