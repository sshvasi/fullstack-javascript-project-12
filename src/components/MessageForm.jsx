import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box, IconButton, Textarea } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';

import { useGetChannelsQuery, useSendMessageMutation } from '@/slices/apiSlice';

const MessageForm = () => {
  const { username } = useSelector((state) => state.auth);
  const { data: channels } = useGetChannelsQuery();
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (values.message.trim() === '') {
      setSubmitting(false);
      return;
    }

    const message = {
      channelId: channels?.currentChannelId,
      username,
      content: values.message,
    };

    sendMessage(message);
    setSubmitting(false);
    resetForm();
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formik.submitForm();
    }
  };

  const formik = useFormik({
    initialValues: { message: '' },
    initialErrors: { message: '' },
    validateOnChange: true,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        width: '100%',
        borderTop: '1px solid',
        p: 2,
        bgcolor: 'background.componentBg',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ width: '100%', maxHeight: 200 }}>
        <Textarea
          autoFocus
          id="message"
          name="message"
          placeholder="Write a messsage..."
          maxRows={5}
          size="md"
          variant="outlined"
          color="neutral"
          sx={{ fontSize: 'sm' }}
          value={formik.values.message}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          onKeyDown={handleEnterPress}
        />
      </Box>
      <IconButton type="submit" variant="plain" color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageForm;
