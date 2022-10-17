import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Box, Link, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '@components/AuthProvider';

const SignupForm = () => {
  const { logIn } = useAuth();

  const validationSchema = yup.object({
    username: yup
      .string('Enter your name')
      .required('Username is required')
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be less than 20 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces'),
    password: yup
      .string('Enter your password')
      .required('Password is required')
      .min(5, 'Must be at least 5 characters'),
    passwordConfirmation: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('/api/v1/signup', values);
      logIn(response.data);
    } catch ({ isAxiosError, response: { status } }) {
      if (isAxiosError && status === 409) {
        actions.setErrors({ username: 'Username already exists' });
        actions.setValues({
          username: '',
          password: '',
          passwordConfirmation: '',
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
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

          <TextField
            fullWidth
            required
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm password"
            type="password"
            margin="normal"
            value={values.passwordConfirmation}
            error={
              touched.passwordConfirmation &&
              Boolean(errors.passwordConfirmation)
            }
            helperText={
              touched.passwordConfirmation && errors.passwordConfirmation
            }
            onChange={handleChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>

          <Typography component="span" variant="body2">
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              underline="none"
            >
              Log in
            </Link>
          </Typography>
        </Box>
      )}
    </Formik>
  );
};

export default SignupForm;
