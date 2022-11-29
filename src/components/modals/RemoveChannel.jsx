import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';

import { useRemoveChannelMutation } from '@/slices/apiSlice';
import { useEffect } from 'react';

const RemoveChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const { isOpened, channelId } = useSelector((state) => state.modals);
  const [removeChannel] = useRemoveChannelMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      await removeChannel({ id: values.id });
      setSubmitting(false);
      onHide();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { id: channelId },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const handlePressEnter = (event) => {
      if (event.key === 'Enter') {
        formik.submitForm();
      }
    };

    window.addEventListener('keypress', handlePressEnter);

    return () => {
      window.removeEventListener('keypress', handlePressEnter);
    };
  });

  return (
    <Modal open={isOpened} onClose={onHide}>
      <ModalDialog>
        <ModalClose />
        <Typography component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          {t('modals.remove.header')}
        </Typography>
        <Typography textColor="text.tertiary" mb={3}>
          {t('modals.remove.confirm')}
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
          onSubmit={formik.handleSubmit}
        >
          <Button variant="plain" color="neutral" onClick={onHide}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" variant="solid" color="danger" disabled={formik.isSubmitting}>
            {t('modals.remove.button')}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default RemoveChannel;
