import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Layout = () => (
  <Container maxWidth="sx">
    <Outlet />
  </Container>
);

export default Layout;
