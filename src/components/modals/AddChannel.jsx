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

import { useCreateChannelMutation, useGetChannelsQuery } from '@/slices/apiSlice';
import { getNewChannelSchema } from '@/utils/schemas';
import { useEffect } from 'react';

const AddChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const isOpened = useSelector((state) => state.modals.isOpened);
  const [createChannel] = useCreateChannelMutation();
  const { channelNames } = useGetChannelsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      channelNames: data.channels.map((channel) => channel.name),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const channel = {
      name: values.name,
    };

    try {
      await createChannel(channel);
      setSubmitting(false);
      onHide();
    } catch {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: '' },
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
          {t('forms.modals.add.title')}
        </Typography>
        <Typography mt={0.5} mb={2} textColor="text.tertiary">
          {t('forms.modals.add.description')}
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              id="name"
              name="name"
              placeholder={t('forms.modals.add.placeholder')}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
            />
            <Button type="submit">{t('forms.modals.add.buttons.confirm')}</Button>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default AddChannel;
