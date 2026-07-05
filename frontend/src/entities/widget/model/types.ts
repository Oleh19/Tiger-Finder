export type WidgetType = 'line' | 'bar' | 'text';

export interface ChartPoint {
  name: string;
  value: number;
}

export type ChartData = ChartPoint[];

export interface TextData {
  content: string;
}

interface WidgetBase {
  id: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChartWidget extends WidgetBase {
  type: 'line' | 'bar';
  data: ChartData;
}

export interface TextWidget extends WidgetBase {
  type: 'text';
  data: TextData;
}

export type Widget = ChartWidget | TextWidget;

export interface CreateWidgetInput {
  type: WidgetType;
  content?: string;
}

export interface UpdateWidgetInput {
  content?: string;
  position?: number;
}
