import { Value } from '@sinclair/typebox/value';

import type { AppDatabase } from '../../db/database.js';
import { type Widget, WidgetSchema, type WidgetType } from './widget.schema.js';

interface WidgetRow {
  id: string;
  type: WidgetType;
  position: number;
  data: string;
  created_at: string;
  updated_at: string;
}

export interface WidgetRecord {
  id: string;
  type: WidgetType;
  position: number;
  data: Widget['data'];
  createdAt: string;
  updatedAt: string;
}

function toWidget(row: WidgetRow): Widget {
  const data: unknown = JSON.parse(row.data);
  const candidate: unknown = {
    id: row.id,
    type: row.type,
    position: row.position,
    data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (!Value.Check(WidgetSchema, candidate)) {
    throw new Error(`Corrupt widget row: ${row.id}`);
  }
  return candidate;
}

export class WidgetRepository {
  constructor(private readonly db: AppDatabase) {}

  findAll(): Widget[] {
    const rows = this.db
      .prepare('SELECT * FROM widgets ORDER BY position ASC, created_at ASC')
      .all() as WidgetRow[];
    return rows.map(toWidget);
  }

  findById(id: string): Widget | undefined {
    const row = this.db
      .prepare('SELECT * FROM widgets WHERE id = ?')
      .get(id) as WidgetRow | undefined;
    return row === undefined ? undefined : toWidget(row);
  }

  nextPosition(): number {
    const row = this.db
      .prepare('SELECT MAX(position) AS max FROM widgets')
      .get() as {
      max: number | null;
    };
    return (row.max ?? -1) + 1;
  }

  create(record: WidgetRecord): Widget {
    const row = this.db
      .prepare(
        `INSERT INTO widgets (id, type, position, data, created_at, updated_at)
         VALUES (@id, @type, @position, @data, @createdAt, @updatedAt)
         RETURNING *`,
      )
      .get({
        id: record.id,
        type: record.type,
        position: record.position,
        data: JSON.stringify(record.data),
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      }) as WidgetRow;
    return toWidget(row);
  }

  update(
    id: string,
    changes: { data: Widget['data']; position: number; updatedAt: string },
  ): Widget {
    const row = this.db
      .prepare(
        `UPDATE widgets
         SET data = @data, position = @position, updated_at = @updatedAt
         WHERE id = @id
         RETURNING *`,
      )
      .get({
        id,
        data: JSON.stringify(changes.data),
        position: changes.position,
        updatedAt: changes.updatedAt,
      }) as WidgetRow | undefined;
    if (row === undefined) {
      throw new Error(`Widget ${id} disappeared during update`);
    }
    return toWidget(row);
  }

  delete(id: string): boolean {
    const result = this.db.prepare('DELETE FROM widgets WHERE id = ?').run(id);
    return result.changes > 0;
  }
}
