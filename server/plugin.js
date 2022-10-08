import path from 'path';
import { fileURLToPath } from 'url';
import fastifySocketIo from 'fastify-socket.io';
import fastifyStatic from 'fastify-static';
import fastifyJWT from 'fastify-jwt';
import HttpErrors from 'http-errors';
import addRoutes from './routes.js';

const { Unauthorized } = HttpErrors;

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const setUpStatic = (app, staticPath = path.join(__dirname, '..', 'dist')) => {
  app
    .register(fastifyStatic, {
      root: staticPath,
    })
    .setNotFoundHandler((_req, res) => {
      res.sendFile('index.html');
    });
};

const setUpAuth = (app) => {
  app
    .register(fastifyJWT, {
      secret: 'supersecret',
    })
    .decorate('authenticate', async (req, reply) => {
      try {
        await req.jwtVerify();
      } catch {
        reply.send(new Unauthorized());
      }
    });
};

const setUpSocket = async (app) => {
  await app.register(fastifySocketIo);
};

export default async (app, options) => {
  setUpAuth(app);
  setUpStatic(app, options.staticPath);
  await setUpSocket(app);
  addRoutes(app, options?.state || {});

  return app;
};
