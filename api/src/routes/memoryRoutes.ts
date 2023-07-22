import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

// import { isAdmin, isAuth } from '../middleware/authMiddleware';
import { 
  getMemories, 
  createMemory,
} from '../controllers/memoryController';


const memoryRoutes: FastifyPluginAsync = async (server) => {
  
  server.get('/memory/get', {
    schema: {
      response: {
        200: Type.Object({
          memories: Type.Array(Type.Any())
        }),
      },
    },
    // preHandler: [(request) => isAuth(server, request)],
    handler: (request, reply) => getMemories(request, reply),
  });

  server.post('/memory/create', {
    schema: {
      request: {
        body: Type.Object({
          question: Type.String(),
          answer: Type.String(),
          audioUrl: Type.String(),
        }),
      },
      response: {
        200: Type.Object({
          success: Type.Boolean()
        }),
      },
    },
    // preHandler: [async (request) => isAuth(server, request)],
    handler: (request, reply) => createMemory(request, reply),
  });

}

export default memoryRoutes;
