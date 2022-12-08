import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Root from '@/components/layout/Root';
import Header from '@/components/layout/Header';
import SideNav from '@/components/layout/SideNav';
import SideDrawer from '@/components/layout/SideDrawer';
import Main from '@/components/layout/Main';
import Modal from '@/components/modals';
import MessagesSection from '@/components/messages/MessagesSection';
import ChannelsSection from '@/components/channels/ChannelsSection';
import { useTheme } from '@mui/joy';

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
