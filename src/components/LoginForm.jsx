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
  }, [dispatch, location, navigate, loginData, isSuccess]);

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
        setFieldError('password', t('forms.errors.login'));

        // Joy UI use wrappers around input field,
        // so using ref (or inputRef like in Material UI) isn't possible
        const input = document.getElementById('username');
        if (input) {
          input.focus();
          input.select();
        }
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
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
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
            <Typography level="h3" component="h1">
              {t('login.header')}
            </Typography>
          </Box>
          <TextField
            fullWidth
            autoFocus
            autoComplete="off"
            id="username"
            name="username"
            label={t('forms.login.label')}
            placeholder={t('forms.login.placeholder')}
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
            label={t('forms.password.label')}
            placeholder={t('forms.password.placeholder')}
            type="password"
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button fullWidth type="submit" disabled={isSubmitting} sx={{ mt: 1 }}>
            {t('login.button')}
          </Button>
          <Typography
            fontSize="sm"
            endDecorator={
              <Link component={RouterLink} to="/signup">
                {t('login.signup')}
              </Link>
            }
            sx={{ alignSelf: 'center' }}
          >
            {t('login.noAccount')}
          </Typography>
        </Sheet>
      )}
    </Formik>
  );
};

export default LoginForm;
