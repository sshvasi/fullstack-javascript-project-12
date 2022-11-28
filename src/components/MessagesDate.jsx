import { Typography } from '@mui/joy';
import ListSubheader from '@mui/joy/ListSubheader';

const MessagesDate = ({ year, month, day, isCurrentYear }) => (
  <ListSubheader
    sticky
    sx={{
      top: 1,
      height: 16,
      minHeight: 16,
      borderRadius: 16,
      textTransform: 'none',
      letterSpacing: 'inherit',
    }}
  >
    <Typography level="body6" fontSize="xs" fontWeight="md">
      {day} {month} {!isCurrentYear && year}
    </Typography>
  </ListSubheader>
);

export default MessagesDate;
