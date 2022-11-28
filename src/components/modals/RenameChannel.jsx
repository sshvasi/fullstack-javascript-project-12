import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  TextField,
  Typography,
} from '@mui/joy';

import { useGetChannelsQuery, useRenameChannelMutation } from '@/slices/apiSlice';
import { getNewChannelSchema } from '@/utils/schemas';
import { useEffect } from 'react';

const RenameChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const { isOpened, channelId } = useSelector((state) => state.modals);
  const [renameChannel] = useRenameChannelMutation();
  const { channelNames, channelToRename } = useGetChannelsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      channelNames: data.channels
        .filter((channel) => channel.id !== channelId)
        .map((channel) => channel.name),
      channelToRename: data.channels.find((channel) => channel.id === channelId),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const channel = {
      id: channelId,
      name: values.name,
    };

    try {
      await renameChannel(channel);
      setSubmitting(false);
      onHide();
    } catch {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: channelToRename?.name },
    initialErrors: { name: '' },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: getNewChannelSchema('name', channelNames),
    onSubmit: handleSubmit,
  });

  // Joy UI doesn't allow use `ref` or `inputRef`.
  useEffect(() => {
    const input = document.querySelector('.JoyInput-input');
    input?.focus();
  });

  return (
    <Modal open={isOpened} onClose={onHide}>
      <ModalDialog
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose />
        <Typography component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          {t('forms.modals.rename.title')}
        </Typography>
        <Typography mt={0.5} mb={2} textColor="text.tertiary">
          {t('forms.modals.rename.description')}
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              id="name"
              name="name"
              placeholder={t('forms.modals.rename.placeholder')}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
            />
            <Box
              sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
              onSubmit={formik.handleSubmit}
            >
              <Button variant="plain" color="neutral" onClick={onHide}>
                {t('forms.modals.rename.buttons.cancel')}
              </Button>
              <Button type="submit" variant="solid" color="success" disabled={formik.isSubmitting}>
                {t('forms.modals.rename.buttons.confirm')}
              </Button>
            </Box>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default RenameChannel;
