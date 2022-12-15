import { memo, useState } from 'react';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuItem,
  Typography,
} from '@mui/joy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MoreVert } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { useGetMessagesQuery } from '@/slices/apiSlice';

const Channel = ({ id, name, selected, removable, onSelect, onRename, onRemove }) => {
  const { t } = useTranslation();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const { lastMessage } = useGetMessagesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      lastMessage: data?.messages.filter((message) => message.channelId === id).at(-1),
    }),
  });

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <ListItem
      sx={{ m: 0 }}
      endAction={
        <IconButton size="md" variant="plain" color="neutral" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
      }
    >
      <ListItemButton
        selected={selected}
        variant={selected ? 'solid' : 'plain'}
        color={selected ? 'primary' : 'neutral'}
        onClick={onSelect}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          height: 85,
          px: 1,
          py: 1.5,
        }}
      >
        <ListItemContent
          sx={{
            mr: 5,
          }}
        >
          <Typography
            fontWeight="md"
            fontSize="sm"
            noWrap
            sx={{
              color: selected ? 'text.active' : 'text.inactive',
            }}
          >
            {name}
          </Typography>
          {lastMessage?.content.length ? (
            <Typography
              fontSize="sm"
              lineHeight={1.3}
              sx={{
                color: selected ? 'text.active' : 'var(--joy-palette-text-tertiary)',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box !important',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                WhiteSpace: 'normal',
              }}
            >
              {lastMessage?.username}: {lastMessage?.content}
            </Typography>
          ) : (
            <Typography
              level="body2"
              noWrap
              sx={{
                color: selected ? 'text.active' : 'var(--joy-palette-text-tertiary)',
              }}
            >
              {t('chat.messages_0')}
            </Typography>
          )}
        </ListItemContent>
      </ListItemButton>
      <Menu anchorEl={menuAnchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={onRename}>
          <ListItemDecorator>
            <EditOutlinedIcon />
          </ListItemDecorator>
          {t('channels.buttons.rename')}
        </MenuItem>
        <MenuItem color="danger" onClick={onRemove} disabled={!removable}>
          <ListItemDecorator>
            <DeleteOutlineOutlinedIcon />
          </ListItemDecorator>
          {t('channels.buttons.delete')}
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default memo(Channel);
