import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
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

import {
  useGetChannelsQuery,
  useRenameChannelMutation,
} from '@/slices/apiSlice';

const getSchema = (fieldName, list) => {
  return yup.object({
    [fieldName]: yup
      .string()
      .trim()
      .required('Channel name is required')
      .max(20, 'Must be less than 20 characters')
      .notOneOf(list, 'Channel already exists'),
  });
};

const RenameChannel = ({ onHide }) => {
  const isOpen = useSelector((state) => state.modals.isOpened);
  const channelId = useSelector((state) => state.modals.extra.channelId);
  const { data: channels } = useGetChannelsQuery();
  const [renameChannel] = useRenameChannelMutation();
  const channelNames = channels.channels.map((c) => c.name);

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
    initialValues: { name: '' },
    initialErrors: { name: '' },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: getSchema('name', channelNames),
    onSubmit: handleSubmit,
  });

  return (
    <Modal open={isOpen} onClose={onHide}>
      <ModalDialog
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose />
        <Typography
          component="h2"
          level="inherit"
          fontSize="1.25em"
          mb="0.25em"
        >
          Rename channel
        </Typography>
        <Typography mt={0.5} mb={2} textColor="text.tertiary">
          Write the name of the channel
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={2}>
            <TextField
              autoFocus
              id="name"
              name="name"
              placeholder="Name..."
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
                Cancel
              </Button>
              <Button
                type="submit"
                variant="solid"
                color="success"
                disabled={formik.isSubmitting}
              >
                Rename
              </Button>
            </Box>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default RenameChannel;
