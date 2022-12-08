import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Sheet, Button, Link, TextField, Typography, Box } from '@mui/joy';

import { signupSchema } from '@/utils/schemas';
import { useSignupUserMutation } from '@/slices/apiSlice';
import { setUser } from '@/slices/authSlice';

const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [signupUser, { data: signupData, isSuccess }] = useSignupUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(signupData));
      navigate(location.state?.from || { pathname: '/' });
    }
  }, [dispatch, location.state?.from, navigate, signupData, isSuccess]);

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldValue, setFieldError, resetForm },
  ) => {
    setSubmitting(true);

    try {
      await signupUser(values).unwrap();
      resetForm();
    } catch (error) {
      if (error?.status === 409) {
        setFieldValue('username', '', false);
        setFieldValue('password', '', false);
        setFieldValue('confirmation', '', false);
        setFieldError('username', t('forms.errors.duplicateUser'));

        // Joy UI use wrappers around input field,
        // so using ref (or inputRef like in Material UI) isn't possible
        const input = document.getElementById('username');
        if (input) {
          input.focus();
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmation: '' }}
      validationSchema={signupSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, handleChange, handleSubmit }) => (
        <Sheet
          component="form"
          variant="outlined"
          noValidate
          sx={{
            width: 300,
            my: 4,
            py: 3,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
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
              {t('signup.header')}
            </Typography>
          </Box>
          <TextField
            fullWidth
            autoFocus
            autoComplete="off"
            id="username"
            name="username"
            placeholder={t('forms.username.placeholder')}
            label={t('forms.username.label')}
            margin="normal"
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label={t('forms.password.label')}
            placeholder={t('forms.password.placeholder')}
            type="password"
            margin="normal"
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            id="confirmation"
            name="confirmation"
            label={t('forms.passwordConfirmation.label')}
            placeholder={t('forms.passwordConfirmation.placeholder')}
            type="password"
            margin="normal"
            value={values.confirmation}
            error={touched.confirmation && Boolean(errors.confirmation)}
            helperText={touched.confirmation && errors.confirmation}
            onChange={handleChange}
          />
          <Button fullWidth type="submit" sx={{ mt: 1 }}>
            {t('signup.button')}
          </Button>
          <Typography
            fontSize="sm"
            endDecorator={
              <Link component={RouterLink} to="/login">
                {t('signup.login')}
              </Link>
            }
            sx={{ alignSelf: 'center' }}
          >
            {t('signup.hasAccount')}
          </Typography>
        </Sheet>
      )}
    </Formik>
  );
};

export default SignupForm;
