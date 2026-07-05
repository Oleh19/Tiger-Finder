import type { FastifyError, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { AppError } from '../lib/errors.js';

export const errorHandlerPlugin = fp(
  (fastify: FastifyInstance) => {
    fastify.setErrorHandler((error: FastifyError, request, reply) => {
      if (error.validation !== undefined) {
        reply.status(400).send({
          error: {
            code: 'VALIDATION_ERROR',
            message: error.message,
            details: error.validation,
          },
        });
        return;
      }

      if (error instanceof AppError) {
        reply.status(error.statusCode).send({
          error: {
            code: error.code,
            message: error.message,
            ...(error.details === undefined ? {} : { details: error.details }),
          },
        });
        return;
      }

      if (
        typeof error.statusCode === 'number' &&
        error.statusCode >= 400 &&
        error.statusCode < 500
      ) {
        reply.status(error.statusCode).send({
          error: {
            code: error.code ?? 'BAD_REQUEST',
            message: error.message,
          },
        });
        return;
      }

      request.log.error({ err: error }, 'Unhandled error');
      reply.status(500).send({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      });
    });

    fastify.setNotFoundHandler((request, reply) => {
      reply.status(404).send({
        error: {
          code: 'NOT_FOUND',
          message: `Route ${request.method} ${request.url} not found`,
        },
      });
    });
  },
  { name: 'error-handler' },
);
