import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Sheet, Button, Link, TextField, Typography, Box } from '@mui/joy';

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
  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
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
          />
          <Button fullWidth type="submit" sx={{ mt: 1 }}>
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
