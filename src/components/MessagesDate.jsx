import { Typography } from '@mui/joy';
import ListSubheader from '@mui/joy/ListSubheader';

const MessagesDate = ({ year, month, day, currentYear, byCurrentUser }) => (
  <ListSubheader
    sticky
    sx={{
      margin: 'auto',
      height: 5,
      minHeight: 20,
      minWidth: 130,
      top: 2,
      borderRadius: 16,
      display: 'flex',
      justifyContent: 'center',
      textTransform: 'none',
      letterSpacing: 'inherit',
    }}
  >
    <Typography level="body6" fontSize="xs" fontWeight="md">
      {month} {day} {year !== currentYear && year}
    </Typography>
  </ListSubheader>
);

export default MessagesDate;
