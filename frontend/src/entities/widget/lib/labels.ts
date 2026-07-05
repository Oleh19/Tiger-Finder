import type { WidgetType } from '../model/types';

const WIDGET_TYPE_LABELS: Record<WidgetType, string> = {
  line: 'Line chart',
  bar: 'Bar chart',
  text: 'Text',
};

export function widgetTypeLabel(type: WidgetType): string {
  return WIDGET_TYPE_LABELS[type];
}
