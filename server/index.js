#! /usr/bin/env node

import path from 'path';
import Fastify from 'fastify';
import { program } from 'commander';
import plugin from './plugin.js';

const port = process.env.PORT || 5001;
const staticPath = path.join(process.cwd(), 'dist');

program
  .version('1.1.3', '-v, --version')
  .usage('[OPTIONS]')
  .option('-a, --address <address>', 'address to listen on', '0.0.0.0')
  .option('-p, --port <port>', 'port to listen on', port)
  .option('-s, --static <path>', 'path to static assets files', staticPath)
  .parse(process.argv);

const options = program.opts();

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  try {
    const server = await plugin(fastify, {
      staticPath: path.resolve(process.cwd(), options.static),
    });
    await server.listen(options.port, options.address);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
