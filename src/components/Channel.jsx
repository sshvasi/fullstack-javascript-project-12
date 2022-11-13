import { IconButton, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import { DeleteForever } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Channel = ({ name, selected, removable, onSelect, onRename, onRemove }) => (
  <ListItem
    endAction={
      <>
        <IconButton size="sm" variant="plain" color="info" onClick={onRename}>
          <EditOutlinedIcon />
        </IconButton>
        {removable && (
          <IconButton size="sm" variant="plain" color="danger" onClick={onRemove}>
            <DeleteForever />
          </IconButton>
        )}
      </>
    }
  >
    <ListItemButton
      selected={selected}
      variant={selected ? 'soft' : 'plain'}
      color="neutral"
      onClick={onSelect}
      sx={{ p: 1, borderRadius: 8 }}
    >
      <ListItemContent>{name}</ListItemContent>
    </ListItemButton>
  </ListItem>
);

export default Channel;
