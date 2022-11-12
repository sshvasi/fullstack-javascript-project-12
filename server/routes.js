import _ from 'lodash';
import HttpErrors from 'http-errors';

const { Unauthorized, Conflict } = HttpErrors;

const getNextId = () => Number(_.uniqueId());

const getState = (defaultState) => {
  const generalChannelId = getNextId();
  const randomChannelId = getNextId();
  const state = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
      { id: 3, name: 'friends', removable: true },
      { id: 4, name: 'colleagues', removable: true },
    ],
    messages: [
      {
        id: getNextId(),
        currentChannelId: generalChannelId,
        username: 'Ivan Ivanov',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, temporibus.',
      },
      {
        id: getNextId(),
        currentChannelId: generalChannelId,
        username: 'Ivan Ivanov',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, suscipit. Laborum quisquam, labore ipsum tenetur vero modi excepturi minus laudantium nulla. Tenetur iusto aliquid numquam perferendis. Sapiente repellendus ab quasi aliquam harum debitis impedit ex maxime fugit. Veritatis repellat eligendi excepturi et odio architecto dolor quos aspernatur totam. Dolorum ad labore ullam ipsam error perspiciatis dolore, magni quia vel sint nulla at explicabo itaque. Sint id officiis itaque ut sequi, facilis recusandae dolorum sit voluptatibus!',
      },
      {
        id: getNextId(),
        currentChannelId: generalChannelId,
        username: 'Ivan Ivanov',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui voluptas beatae illo. Assumenda molestias consequatur, autem, perspiciatis illo accusantium sequi quibusdam consectetur, deleniti accusamus dignissimos eius dicta ut fugiat. Dicta nobis quas ullam labore, incidunt vero perspiciatis explicabo, odit iste temporibus maxime earum velit culpa? Dolore obcaecati nam quia!',
      },
      {
        id: getNextId(),
        currentChannelId: generalChannelId,
        username: 'Ivan Ivanov',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, temporibus.',
      },
      {
        id: getNextId(),
        currentChannelId: generalChannelId,
        username: 'Ivan Ivanov',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, suscipit. Laborum quisquam, labore ipsum tenetur vero modi excepturi minus laudantium nulla. Tenetur iusto aliquid numquam perferendis. Sapiente repellendus ab quasi aliquam harum debitis impedit ex maxime fugit. Veritatis repellat eligendi excepturi et odio architecto dolor quos aspernatur totam. Dolorum ad labore ullam ipsam error perspiciatis dolore, magni quia vel sint nulla at explicabo itaque. Sint id officiis itaque ut sequi, facilis recusandae dolorum sit voluptatibus!',
      },
      {
        id: getNextId(),
        currentChannelId: generalChannelId,
        username: 'Ivan Ivanov',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui voluptas beatae illo. Assumenda molestias consequatur, autem, perspiciatis illo accusantium sequi quibusdam consectetur, deleniti accusamus dignissimos eius dicta ut fugiat. Dicta nobis quas ullam labore, incidunt vero perspiciatis explicabo, odit iste temporibus maxime earum velit culpa? Dolore obcaecati nam quia!',
      },
    ],
    currentChannelId: generalChannelId,
    users: [
      { id: 1, username: 'admin1', password: 'admin1' },
      { id: 2, username: 'admin2', password: 'admin2' },
      { id: 3, username: 'admin3', password: 'admin3' },
      { id: 4, username: 'admin4', password: 'admin4' },
      { id: 5, username: 'admin5', password: 'admin5' },
    ],
  };

  if (defaultState.messages) {
    state.messages.push(...defaultState.messages);
  }
  if (defaultState.channels) {
    state.channels.push(...defaultState.channels);
  }
  if (defaultState.currentChannelId) {
    state.currentChannelId = defaultState.currentChannelId;
  }
  if (defaultState.users) {
    state.users.push(...defaultState.users);
  }

  return state;
};

export default (app, defaultState = {}) => {
  const state = getState(defaultState);

  app.io.on('connect', (socket) => {
    console.log({ 'socket.id': socket.id });

    socket.on('newMessage', (message, acknowledge = _.noop) => {
      const messageWithId = {
        ...message,
        id: getNextId(),
      };

      state.messages.push(messageWithId);
      acknowledge({ status: 'ok' });
      app.io.emit('newMessage', messageWithId);
    });

    socket.on('newChannel', (channel, acknowledge = _.noop) => {
      const channelWithId = {
        ...channel,
        removable: true,
        id: getNextId(),
      };

      state.channels.push(channelWithId);
      acknowledge({ status: 'ok', data: channelWithId });
      app.io.emit('newChannel', channelWithId);
    });

    socket.on('removeChannel', ({ id }, acknowledge = _.noop) => {
      const channelId = Number(id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
      const data = { id: channelId };

      acknowledge({ status: 'ok' });
      app.io.emit('removeChannel', data);
    });

    socket.on('renameChannel', ({ id, name }, acknowledge = _.noop) => {
      const channelId = Number(id);
      const channel = state.channels.find((c) => c.id === channelId);
      if (!channel) return;
      channel.name = name;

      acknowledge({ status: 'ok' });
      app.io.emit('renameChannel', channel);
    });
  });

  app.post('/api/v1/login', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      reply.send(new Unauthorized());
      return;
    }

    const token = app.jwt.sign({ userId: user.id });
    reply.send({ token, username });
  });

  app.post('/api/v1/signup', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (user) {
      reply.send(new Conflict());
      return;
    }

    const newUser = { id: getNextId(), username, password };
    const token = app.jwt.sign({ userId: newUser.id });
    state.users.push(newUser);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ token, username });
  });

  app.get('/api/v1/channels', { preValidation: [app.authenticate] }, (req, reply) => {
    const user = state.users.find(({ id }) => id === req.user.userId);

    if (!user) {
      reply.send(new Unauthorized());
      return;
    }

    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(_.pick(state, ['channels', 'currentChannelId']));
  });

  app.get('/api/v1/messages', { preValidation: [app.authenticate] }, (req, reply) => {
    const user = state.users.find(({ id }) => id === req.user.userId);

    if (!user) {
      reply.send(new Unauthorized());
      return;
    }

    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(_.pick(state, ['messages']));
  });

  app.get('/', (_req, reply) => {
    reply.sendFile('index.html');
  });
};
