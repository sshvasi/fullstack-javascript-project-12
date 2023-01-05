import { useDispatch } from 'react-redux';
import { Box, Sheet } from '@mui/joy';

import { closeDrawer } from '@/slices/drawerSlice';

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <Box sx={{ position: 'fixed', zIndex: 120, width: '100%', height: '100%' }}>
      <Box
        onClick={handleCloseDrawer}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: (theme) => `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
        }}
      />
      <Sheet
        sx={{
          width: 256,
          height: '100%',
          boxShadow: 'lg',
          bgcolor: 'background.body',
          overflow: 'auto',
        }}
      >
        {children}
      </Sheet>
    </Box>
  );
};

export default SideDrawer;
