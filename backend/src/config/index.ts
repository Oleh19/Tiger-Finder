import { existsSync } from 'node:fs';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const ConfigSchema = Type.Object({
  PORT: Type.Number({ minimum: 1, maximum: 65535, default: 3001 }),
  HOST: Type.String({ default: '0.0.0.0' }),
  DATABASE_PATH: Type.String({ default: './data/widgets.db' }),
  CORS_ORIGIN: Type.String({ default: 'http://localhost:5173' }),
  NODE_ENV: Type.Union(
    [
      Type.Literal('development'),
      Type.Literal('production'),
      Type.Literal('test'),
    ],
    { default: 'development' },
  ),
});

export type Config = typeof ConfigSchema.static;

function loadConfig(): Config {
  if (existsSync('.env')) {
    process.loadEnvFile('.env');
  }

  const raw = {
    PORT: process.env.PORT === undefined ? undefined : Number(process.env.PORT),
    HOST: process.env.HOST,
    DATABASE_PATH: process.env.DATABASE_PATH,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    NODE_ENV: process.env.NODE_ENV,
  };

  const withDefaults = Value.Default(ConfigSchema, raw);
  const errors = [...Value.Errors(ConfigSchema, withDefaults)];

  if (errors.length > 0) {
    const summary = errors
      .map((e) => `${e.path || '/'}: ${e.message}`)
      .join('; ');
    throw new Error(`Invalid configuration: ${summary}`);
  }

  return Value.Decode(ConfigSchema, withDefaults);
}

export const config = loadConfig();
