import { useState } from 'react';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const modalOpen = useSelector((state) => state.modals.isOpened);
  const modalType = useSelector((state) => state.modals.type);

  return (
    <>
      {drawerOpen && (
        <SideDrawer onDrawerClose={() => setDrawerOpen(false)}>
          <Channels />
        </SideDrawer>
      )}
      <Root drawerOpen>
        <Header onDrawerOpen={() => setDrawerOpen(true)} />
        <SideNav>
          <Channels />
        </SideNav>
        <Main>
          <Messages />
          <MessageForm />
        </Main>
      </Root>
      {modalOpen && <Modal type={modalType} />}
    </>
  );
};

export default Chat;
