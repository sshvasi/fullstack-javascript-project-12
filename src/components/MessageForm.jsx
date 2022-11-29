import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, Textarea } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

import { useGetChannelsQuery, useSendMessageMutation } from '@/slices/apiSlice';

const MessageForm = () => {
  const { t } = useTranslation();
  const isDrawerOpen = useSelector((state) => state.drawer.isOpened);
  const { username } = useSelector((state) => state.auth);
  const { data: channelsData } = useGetChannelsQuery();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    setSubmitting(true);

    if (values.message.trim() === '') {
      setSubmitting(false);
      return;
    }

    const message = {
      channelId: channelsData?.currentChannelId,
      username,
      content: values.message,
    };

    try {
      await sendMessage(message).unwrap();
      resetForm();
    } catch {
      setFieldError('message', t('errors.network'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEnterPress = (submitForm) => (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitForm();
    }
  };

  const formik = useFormik({
    initialValues: { message: '' },
    initialErrors: { message: '' },
    validateOnChange: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    // Joy UI doesn't provide `ref` or `inputRef`, so here is a query selector.
    const textarea = document.querySelector('.JoyTextarea-textarea');
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    const handleWidthChange = (event) => {
      if (!isDrawerOpen && event.matches) {
        textarea?.focus();
      }
    };

    mediaQuery.addEventListener('change', handleWidthChange);

    handleWidthChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleWidthChange);
    };
  });

  return (
    <Box
      className="Form"
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
      <Textarea
        id="message"
        name="message"
        placeholder={t('forms.message.placeholder')}
        label={t('forms.message.label')}
        maxRows={5}
        size="md"
        variant="outlined"
        color="neutral"
        sx={{ fontSize: 'sm', width: '100%', maxHeight: 200 }}
        value={formik.values.message}
        error={formik.touched.message && Boolean(formik.errors.message)}
        disabled={formik.isSubmitting && isSending}
        onChange={formik.handleChange}
        onKeyDown={handleEnterPress(formik.submitForm)}
      />
      {Boolean(formik.errors.message) && (
        <FormHelperText
          sx={{
            color: 'var(--joy-palette-danger-500)',
          }}
        >
          {formik.touched.message && formik.errors.message}
        </FormHelperText>
      )}
      <Button type="submit" variant="plain" color="primary" endDecorator={<SendIcon />}>
        {t('common.send')}
      </Button>
    </Box>
  );
};

export default MessageForm;
