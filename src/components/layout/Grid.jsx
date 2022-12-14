import { Grid as JoyGrid } from '@mui/joy';

const Grid = ({ children }) => (
  <JoyGrid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      height: '100vh',
      gap: 2,
      bgcolor: 'background.body',
      overflow: 'auto',
    }}
  >
    {children}
  </JoyGrid>
);

export default Grid;
