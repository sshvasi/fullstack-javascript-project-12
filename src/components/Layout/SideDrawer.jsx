import { useDispatch } from 'react-redux';
import { Box, Sheet } from '@mui/joy';

import { closeDrawer } from '@/slices/drawerSlice';

const SideDrawer = ({ children, sx = [], ...props }) => {
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <Box
      {...props}
      sx={[
        { position: 'fixed', zIndex: 120, width: '100%', height: '100%' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        role="button"
        onClick={handleCloseDrawer}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: (theme) =>
            `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
        }}
      />
      <Sheet
        sx={{
          minWidth: 256,
          width: 'max-content',
          height: '100%',
          p: 2,
          boxShadow: 'lg',
          bgcolor: 'background.componentBg',
          overflow: 'auto',
        }}
      >
        {children}
      </Sheet>
    </Box>
  );
};

export default SideDrawer;
