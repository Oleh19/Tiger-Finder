import { randomUUID } from 'node:crypto';

import { InvalidRequestError, NotFoundError } from '../../lib/errors.js';
import { generateChartData } from './widget.data.js';
import type { WidgetRepository } from './widget.repository.js';
import type {
  CreateWidgetBody,
  UpdateWidgetBody,
  Widget,
} from './widget.schema.js';

export class WidgetService {
  constructor(private readonly repository: WidgetRepository) {}

  list(): Widget[] {
    return this.repository.findAll();
  }

  create(body: CreateWidgetBody): Widget {
    const now = new Date().toISOString();

    if (body.type === 'text') {
      return this.repository.create({
        id: randomUUID(),
        type: 'text',
        position: this.repository.nextPosition(),
        data: { content: body.content ?? '' },
        createdAt: now,
        updatedAt: now,
      });
    }

    if (body.content !== undefined) {
      throw new InvalidRequestError('content is only allowed for text widgets');
    }

    return this.repository.create({
      id: randomUUID(),
      type: body.type,
      position: this.repository.nextPosition(),
      data: generateChartData(),
      createdAt: now,
      updatedAt: now,
    });
  }

  update(id: string, body: UpdateWidgetBody): Widget {
    const existing = this.repository.findById(id);
    if (existing === undefined) {
      throw new NotFoundError('Widget', id);
    }

    if (body.content !== undefined && existing.type !== 'text') {
      throw new InvalidRequestError(
        'content can only be updated on text widgets',
      );
    }

    const data: Widget['data'] =
      existing.type === 'text' && body.content !== undefined
        ? { content: body.content }
        : existing.data;

    return this.repository.update(id, {
      data,
      position: body.position ?? existing.position,
      updatedAt: new Date().toISOString(),
    });
  }

  delete(id: string): void {
    const deleted = this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundError('Widget', id);
    }
  }
}
