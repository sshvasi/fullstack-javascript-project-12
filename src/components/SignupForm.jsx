import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Sheet, Button, Link, TextField, Typography, Box } from '@mui/joy';

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
    .min(6, 'Must be at least 6 characters'),
  passwordConfirmation: yup
    .string()
    .required('Please retype your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const SignupForm = () => {
  const handleSubmit = () => {
    console.log('submit');
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
          <Box>
            <Typography level="h4" component="h1">
              Hi!
            </Typography>
            <Typography level="body2">Sign up to continue.</Typography>
          </Box>
          <TextField
            fullWidth
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
          <Button fullWidth type="submit" sx={{ mt: 1 }}>
            Sign up
          </Button>
          <Typography
            fontSize="sm"
            endDecorator={
              <Link component={RouterLink} to="/login">
                Log in
              </Link>
            }
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?{' '}
          </Typography>
        </Sheet>
      )}
    </Formik>
  );
};

export default SignupForm;
