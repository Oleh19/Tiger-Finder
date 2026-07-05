import { type Static, Type } from '@sinclair/typebox';

export const WIDGET_TYPES = ['line', 'bar', 'text'] as const;
export type WidgetType = (typeof WIDGET_TYPES)[number];

export const ChartPointSchema = Type.Object(
  {
    name: Type.String(),
    value: Type.Number(),
  },
  { additionalProperties: false },
);

export const ChartDataSchema = Type.Array(ChartPointSchema, { minItems: 1 });
export const TextDataSchema = Type.Object(
  { content: Type.String({ maxLength: 10_000 }) },
  { additionalProperties: false },
);

export type ChartData = Static<typeof ChartDataSchema>;
export type TextData = Static<typeof TextDataSchema>;

const WidgetBase = {
  id: Type.String({ minLength: 1 }),
  position: Type.Integer({ minimum: 0 }),
  createdAt: Type.String(),
  updatedAt: Type.String(),
};

export const ChartWidgetSchema = Type.Object(
  {
    ...WidgetBase,
    type: Type.Union([Type.Literal('line'), Type.Literal('bar')]),
    data: ChartDataSchema,
  },
  { additionalProperties: false },
);

export const TextWidgetSchema = Type.Object(
  {
    ...WidgetBase,
    type: Type.Literal('text'),
    data: TextDataSchema,
  },
  { additionalProperties: false },
);

export const WidgetSchema = Type.Union([ChartWidgetSchema, TextWidgetSchema]);
export type Widget = Static<typeof WidgetSchema>;

export const WidgetListSchema = Type.Array(WidgetSchema);

export const WidgetParamsSchema = Type.Object(
  { id: Type.String({ minLength: 1 }) },
  { additionalProperties: false },
);
export type WidgetParams = Static<typeof WidgetParamsSchema>;

export const CreateWidgetBodySchema = Type.Object(
  {
    type: Type.Union(WIDGET_TYPES.map((value) => Type.Literal(value))),
    content: Type.Optional(Type.String({ maxLength: 10_000 })),
  },
  { additionalProperties: false },
);
export type CreateWidgetBody = Static<typeof CreateWidgetBodySchema>;

export const UpdateWidgetBodySchema = Type.Object(
  {
    content: Type.Optional(Type.String({ maxLength: 10_000 })),
    position: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false, minProperties: 1 },
);
export type UpdateWidgetBody = Static<typeof UpdateWidgetBodySchema>;

export const ErrorResponseSchema = Type.Object(
  {
    error: Type.Object({
      code: Type.String(),
      message: Type.String(),
      details: Type.Optional(Type.Unknown()),
    }),
  },
  { additionalProperties: false },
);
