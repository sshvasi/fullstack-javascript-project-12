import { useState } from 'react';

import Root from '@/components/Layout/Root';
import Header from '@/components/Layout/Header';
import SideNav from '@/components/Layout/SideNav';
import SideDrawer from '@/components/Layout/SideDrawer';
import Main from '@/components/Layout/Main';
import Channels from '@/components/Channels';
import Messages from '@/components/Messages';
import MessageForm from '@/components/MessageForm';

const Chat = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    </>
  );
};

export default Chat;
