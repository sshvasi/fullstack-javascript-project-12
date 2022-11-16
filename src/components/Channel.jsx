import { memo } from 'react';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemContent,
  Tooltip,
} from '@mui/joy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
        <Tooltip title="Rename channel" size="sm" placement="left-end">
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={onRename}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        {removable && (
          <Tooltip title="Delete channel" size="sm" placement="right-start">
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={onRemove}
              sx={{ ml: 1 }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
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

export default memo(Channel);
