import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Sheet, Button, Link, TextField, Typography, Box } from '@mui/joy';

import { loginSchema } from '@/utils/schemas';
import { setUser } from '@/slices/authSlice';
import { useLoginUserMutation } from '@/slices/apiSlice';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginUser, { data: loginData, isSuccess }] = useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(loginData));
      navigate(location.state?.from || { pathname: '/' });
    }
  }, [isSuccess]);

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldValue, setFieldError, resetForm },
  ) => {
    setSubmitting(true);

    try {
      await loginUser(values).unwrap();
      resetForm();
    } catch (error) {
      if (error?.status === 401) {
        setFieldValue('password', '', false);
        setFieldValue('username', '', false);
        setFieldError('password', t('forms.login.password.validation.invalid'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      initialErrors={{ username: '', password: '' }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Sheet
          noValidate
          component="form"
          variant="outlined"
          sx={{
            width: 300,
            my: 4,
            py: 3,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'md',
          }}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Typography level="h4" component="h1">
              {t('forms.login.title')}
            </Typography>
            <Typography level="body2">
              {t('forms.login.description')}
            </Typography>
          </Box>
          <TextField
            fullWidth
            autoFocus
            id="username"
            name="username"
            label={t('forms.login.username.label')}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label={t('forms.login.password.label')}
            type="password"
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            fullWidth
            type="submit"
            disabled={isSubmitting}
            sx={{ mt: 1 }}
          >
            Log In
          </Button>
          <Typography
            fontSize="sm"
            endDecorator={
              <Link component={RouterLink} to="/signup">
                {t('forms.login.signup')}
              </Link>
            }
            sx={{ alignSelf: 'center' }}
          >
            {t('forms.login.account')}
          </Typography>
        </Sheet>
      )}
    </Formik>
  );
};

export default LoginForm;
