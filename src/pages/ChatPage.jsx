import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@components/AuthProvider';

const Chat = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  return <h1>Chat</h1>;
};

export default Chat;
