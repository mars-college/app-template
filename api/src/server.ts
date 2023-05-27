import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJWT from '@fastify/jwt';

import config from './plugins/config';
import registerMongo from './plugins/mongoPlugin';
import registerMultipart from './plugins/multipartPlugin';
import { routes } from './routes';


export interface CreateServerOpts {
  mongoUri?: string;
}

const createServer = async (
  opts: CreateServerOpts = {
  },
) => {
  const server = fastify({
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true,
      },
    },
    logger: {
      level: process.env.LOG_LEVEL,
    },
  });

  await server.register(config);

  await registerMongo(server, opts.mongoUri);
  await registerMultipart(server);
  
  await server.register(fastifyJWT, {
    secret: server.config.JWT_SECRET,
  });

  await server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  await server.register(import('@fastify/rate-limit'), {
    max: 10000,
    timeWindow: '1 minute',
  });

  routes.map(async (route) => {
    await server.register(route);
  });

  await server.ready();

  return server;
};

export default createServer;
