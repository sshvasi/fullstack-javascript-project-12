import { Container, Typography } from '@mui/material';
import SignupForm from '@components/SignupForm';

const SignupPage = () => (
  <Container
    maxWidth="sm"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <SignupForm />
  </Container>
);

export default SignupPage;
