import cors from '@fastify/cors';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';

import { widgetRoutes } from './modules/widget/widget.routes.js';
import { dbPlugin } from './plugins/db.js';
import { errorHandlerPlugin } from './plugins/error-handler.js';

export interface BuildAppOptions {
  databasePath: string;
  corsOrigin: string;
  logger?: FastifyServerOptions['logger'];
}

export async function buildApp(
  options: BuildAppOptions,
): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? false,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await app.register(cors, { origin: options.corsOrigin });
  await app.register(errorHandlerPlugin);
  await app.register(dbPlugin, { path: options.databasePath });

  app.get('/health', () => ({ status: 'ok' }));

  await app.register(widgetRoutes, { prefix: '/api/widgets' });

  return app;
}
