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

import { useCreateChannelMutation, useGetChannelsQuery } from '@/slices/apiSlice';

const getSchema = (fieldName, list) => {
  return yup.object({
    [fieldName]: yup
      .string()
      .trim()
      .required('Channel name is required')
      .notOneOf(list, 'Channel already exists'),
  });
};

const AddChannel = ({ onHide }) => {
  const isOpen = useSelector((state) => state.modals.isOpened);
  const { data: channels } = useGetChannelsQuery();
  const [createChannel] = useCreateChannelMutation();
  const channelNames = channels.channels.map((c) => c.name);

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
        <Typography component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Add new channel
        </Typography>
        <Typography mt={0.5} mb={2} textColor="text.tertiary">
          Write the name of the channel
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
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
            <Button type="submit">Add</Button>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default AddChannel;
