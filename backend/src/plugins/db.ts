import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { type AppDatabase, createDatabase } from '../db/database.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: AppDatabase;
  }
}

export interface DbPluginOptions {
  path: string;
}

export const dbPlugin = fp<DbPluginOptions>(
  (fastify: FastifyInstance, options) => {
    const db = createDatabase(options.path);
    fastify.decorate('db', db);

    fastify.addHook('onClose', (instance) => {
      instance.db.close();
    });
  },
  { name: 'db' },
);
