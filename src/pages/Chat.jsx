import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useTheme } from '@mui/joy';

import MessagesSection from '@/components/messages/MessagesSection';
import ChannelsSection from '@/components/channels/ChannelsSection';
import Modal from '@/components/modals';
import Root from '@/components/Root';
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import SideDrawer from '@/components/SideDrawer';
import Main from '@/components/Main';

const Chat = () => {
  const isDrawerOpen = useSelector((state) => state.drawer.isOpened);
  const isModalOpen = useSelector((state) => state.modals.isOpened);
  const modalType = useSelector((state) => state.modals.type);
  const { palette } = useTheme();

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
          <MessagesSection />
        </Main>
      </Root>
      <ToastContainer theme={palette.mode} />
      {isModalOpen && <Modal type={modalType} />}
    </>
  );
};

export default Chat;
