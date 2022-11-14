import { useSelector } from 'react-redux';

import Root from '@/components/Layout/Root';
import Header from '@/components/Layout/Header';
import SideNav from '@/components/Layout/SideNav';
import SideDrawer from '@/components/Layout/SideDrawer';
import Main from '@/components/Layout/Main';
import Channels from '@/components/Channels';
import Messages from '@/components/Messages';
import MessageForm from '@/components/MessageForm';
import Modal from '@/components/modals';

const Chat = () => {
  const isDrawerOpen = useSelector((state) => state.drawer.isOpened);
  const isModalOpen = useSelector((state) => state.modals.isOpened);
  const modalType = useSelector((state) => state.modals.type);

  return (
    <>
      {isDrawerOpen && (
        <SideDrawer>
          <Channels />
        </SideDrawer>
      )}
      <Root>
        <Header />
        <SideNav>
          <Channels />
        </SideNav>
        <Main>
          <Messages />
          <MessageForm />
        </Main>
      </Root>
      {isModalOpen && <Modal type={modalType} />}
    </>
  );
};

export default Chat;
