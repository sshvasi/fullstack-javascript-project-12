import { useDispatch } from 'react-redux';

import { closeModal } from '@/slices/modalsSlice';
import AddChannel from '@/components/modals/AddChannel';
import RemoveChannel from '@/components/modals/RemoveChannel';
import RenameChannel from '@/components/modals/RenameChannel';

const modalTypes = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const Modal = ({ type }) => {
  const dispatch = useDispatch();

  const hideHandler = () => {
    dispatch(closeModal());
  };

  const SelectedModal = modalTypes[type];

  return <SelectedModal onHide={hideHandler} />;
};

export default Modal;
