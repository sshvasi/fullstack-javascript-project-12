import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemContent,
} from '@mui/joy';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';

const Channel = ({
  name,
  selected,
  removable,
  onSelect,
  onRename,
  onRemove,
}) => (
  <ListItem
    endAction={
      <>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={onRename}
        >
          <EditRoundedIcon />
        </IconButton>
        {removable && (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={onRemove}
          >
            <DeleteIcon />
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
      sx={{
        p: 1,
        borderRadius: 8,
      }}
    >
      <ListItemContent
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mr: 8,
        }}
      >
        {name}
      </ListItemContent>
    </ListItemButton>
  </ListItem>
);

export default Channel;
