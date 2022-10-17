import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Box, Link, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '@components/AuthProvider';

const LoginForm = () => {
  const { logIn } = useAuth;

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
      .min(5, 'Must be at least 5 characters'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      logIn(response.data);
    } catch ({ isAxiosError, response: { status } }) {
      if (isAxiosError && status === 401) {
        actions.setErrors({
          username: '',
          password: 'Wrong username or password',
        });
        actions.setValues({ ...values, password: '' });
      }
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, handleChange, handleSubmit }) => (
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit}
          textAlign="center"
        >
          <TextField
            fullWidth
            required
            autoFocus
            id="username"
            name="username"
            label="Name"
            margin="normal"
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography component="span" variant="body2">
            Don&apos;t have an account?{' '}
            <Link
              component={RouterLink}
              to="/signup"
              variant="body2"
              underline="none"
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
