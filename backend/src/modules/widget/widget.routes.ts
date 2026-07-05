import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

import { WidgetRepository } from './widget.repository.js';
import {
  CreateWidgetBodySchema,
  ErrorResponseSchema,
  UpdateWidgetBodySchema,
  WidgetListSchema,
  WidgetParamsSchema,
  WidgetSchema,
} from './widget.schema.js';
import { WidgetService } from './widget.service.js';

export const widgetRoutes: FastifyPluginAsyncTypebox = (fastify) => {
  const service = new WidgetService(new WidgetRepository(fastify.db));

  fastify.get('/', { schema: { response: { 200: WidgetListSchema } } }, () => {
    return service.list();
  });

  fastify.post(
    '/',
    {
      schema: {
        body: CreateWidgetBodySchema,
        response: { 201: WidgetSchema, 400: ErrorResponseSchema },
      },
    },
    (request, reply) => {
      const widget = service.create(request.body);
      reply.status(201);
      return widget;
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        params: WidgetParamsSchema,
        body: UpdateWidgetBodySchema,
        response: {
          200: WidgetSchema,
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    (request) => {
      return service.update(request.params.id, request.body);
    },
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: WidgetParamsSchema,
        response: { 204: { type: 'null' }, 404: ErrorResponseSchema },
      },
    },
    (request, reply) => {
      service.delete(request.params.id);
      reply.status(204);
      return null;
    },
  );

  return Promise.resolve();
};
