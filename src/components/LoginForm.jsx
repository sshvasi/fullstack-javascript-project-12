import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Sheet, Button, Link, TextField, Typography, Box } from '@mui/joy';

import { setUser } from '@/slices/authSlice';
import { useLoginUserMutation } from '@/slices/apiSlice';

const validationSchema = yup.object({
  username: yup
    .string('Enter your name')
    .min(3, 'Must be at least 3 characters')
    .max(20, 'Must be less than 20 characters')
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    .min(6, 'Must be at least 6 characters'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginUser, { data: loginData, isSuccess }] = useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(loginData));
      navigate(location.state?.from || { pathname: '/' });
    }
  }, [isSuccess, navigate]);

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
        setFieldError('password', 'Username or password is invalid');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      initialErrors={{ username: '', password: '' }}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={validationSchema}
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
          <Box>
            <Typography level="h4" component="h1">
              Welcome!
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </Box>
          <TextField
            fullWidth
            autoFocus
            id="username"
            name="username"
            label="Name"
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
            label="Password"
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
                Sign up
              </Link>
            }
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      )}
    </Formik>
  );
};

export default LoginForm;
