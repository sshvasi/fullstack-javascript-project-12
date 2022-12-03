import { useSelector } from 'react-redux';

import Root from '@/components/layout/Root';
import Header from '@/components/layout/Header';
import SideNav from '@/components/layout/SideNav';
import SideDrawer from '@/components/layout/SideDrawer';
import Main from '@/components/layout/Main';
import Channels from '@/components/Channels';
import Messages from '@/components/Messages';
import MessageForm from '@/components/MessageForm';
import Modal from '@/components/modals';
import MessagesSection from '@/components/MessagesSection';
import ChannelsSection from '@/components/ChannelsSection';

const Chat = () => {
  const isDrawerOpen = useSelector((state) => state.drawer.isOpened);
  const isModalOpen = useSelector((state) => state.modals.isOpened);
  const modalType = useSelector((state) => state.modals.type);

  return (
    <>
      {isDrawerOpen && (
        <SideDrawer>
          <ChannelsSection />
        </SideDrawer>
      )}
      <Root>
        <Header />
        <SideNav>
          <ChannelsSection />
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
