import { Grid as JoyGrid } from '@mui/joy';

const Grid = ({ children, sx = [], ...props }) => (
  <JoyGrid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    sx={[
      { height: '100vh', gap: 2, bgcolor: 'background.appBody' },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...props}
  >
    {children}
  </JoyGrid>
);

export default Grid;
