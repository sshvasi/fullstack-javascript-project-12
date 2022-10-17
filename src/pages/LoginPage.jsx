import { Container, Typography } from '@mui/material';
import LoginForm from '@components/LoginForm';

const LoginPage = () => (
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
      Log in
    </Typography>
    <LoginForm />
  </Container>
);

export default LoginPage;
