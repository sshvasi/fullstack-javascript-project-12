import _ from 'lodash';
import HttpErrors from 'http-errors';

const { Unauthorized, Conflict } = HttpErrors;

const getNextId = () => Number(_.uniqueId());

const getState = (defaultState) => {
  const generalChannelId = getNextId();
  const randomChannelId = getNextId();
  const friendsChannelId = getNextId();
  const state = {
    channels: [
      { id: generalChannelId, name: 'General', removable: false },
      { id: randomChannelId, name: 'Random', removable: false },
      { id: friendsChannelId, name: 'Friends', removable: true },
    ],
    messages: [
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 7, 2, 15, 4).getTime(),
        username: 'Jack Chapman',
        content:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id vero illo odit architecto ipsum commodi, neque sit eveniet laborum tempora illum et omnis. Aperiam, iusto enim! Eveniet inventore minus officiis, molestiae esse dicta illo accusantium temporibus ut illum in doloribus modi magnam excepturi explicabo ea veniam. Ad accusantium voluptatum sit',
      },
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 8, 1, 2, 1).getTime(),
        username: 'John Smith',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, temporibus.',
      },
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 8, 13, 11, 1).getTime(),
        username: 'Thomas Adams',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
      },
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 8, 5, 5, 14).getTime(),
        username: 'Jack Chapman',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, fugiat soluta aliquid aut omnis dicta necessitatibus, ab quasi quia, alias eveniet tempora. Quidem nostrum vel iusto cumque quod modi aut corrupti voluptatibus animi, quae commodi facere tenetur repellendus, saepe dolorem, vitae eum nisi iste unde explicabo! Ducimus quam excepturi aliquid esse asperiores obcaecati, consequatur natus reprehenderit repellendus veniam doloremque tenetur optio reiciendis, voluptate culpa consectetur ex repudiandae placeat quaerat est? Voluptate omnis laboriosam labore optio.',
      },

      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 9, 5, 1, 7).getTime(),
        username: 'James Anderson',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 9, 23, 1, 7).getTime(),
        username: 'Jack Booth',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, temporibus.',
      },
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 9, 23, 9, 32).getTime(),
        username: 'Martin Bell',
        content: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        id: getNextId(),
        channelId: generalChannelId,
        date: new Date(2022, 9, 23, 15, 7).getTime(),
        username: 'Jack Chapman',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo et earum ut iure numquam pariatur dolorem provident ab architecto quod, nulla odio tempora deleniti tempore, nesciunt, possimus quisquam suscipit maxime maiores. At, quas quidem nisi non facere repellat laudantium temporibus dolor magni rem quam id alias commodi ratione recusandae voluptatum consequatur! Assumenda quas blanditiis eos quibusdam dolores incidunt consequuntur rem.',
      },
      {
        id: getNextId(),
        channelId: randomChannelId,
        date: new Date(2022, 10, 8, 10, 15).getTime(),
        username: 'David Brown',
        content: 'Lorem ipsum dolor sit.',
      },
      {
        id: getNextId(),
        channelId: friendsChannelId,
        date: new Date(2022, 10, 8, 22, 37).getTime(),
        username: 'John Johnson',
        content: 'There are no friends here.',
      },
    ],
    currentChannelId: generalChannelId,
    users: [
      { id: 1, username: 'admin1', password: 'admin1' },
      { id: 2, username: 'admin2', password: 'admin2' },
      { id: 3, username: 'admin3', password: 'admin3' },
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
        date: Date.now(),
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

  app.get(
    '/api/v1/channels',
    { preValidation: [app.authenticate] },
    (req, reply) => {
      const user = state.users.find(({ id }) => id === req.user.userId);

      if (!user) {
        reply.send(new Unauthorized());
        return;
      }

      reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(_.pick(state, ['channels', 'currentChannelId']));
    },
  );

  app.get(
    '/api/v1/messages',
    { preValidation: [app.authenticate] },
    (req, reply) => {
      const user = state.users.find(({ id }) => id === req.user.userId);

      if (!user) {
        reply.send(new Unauthorized());
        return;
      }

      reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(_.pick(state, ['messages']));
    },
  );

  app.get('/', (_req, reply) => {
    reply.sendFile('index.html');
  });
};
