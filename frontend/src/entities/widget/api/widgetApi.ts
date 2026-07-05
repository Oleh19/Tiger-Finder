import { request } from '@/shared/api/httpClient';

import type {
  CreateWidgetInput,
  UpdateWidgetInput,
  Widget,
} from '../model/types';

export const widgetKeys = {
  all: ['widgets'] as const,
};

export function fetchWidgets(): Promise<Widget[]> {
  return request<Widget[]>('/api/widgets');
}

export function createWidget(input: CreateWidgetInput): Promise<Widget> {
  return request<Widget>('/api/widgets', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateWidget(
  id: string,
  input: UpdateWidgetInput,
): Promise<Widget> {
  return request<Widget>(`/api/widgets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteWidget(id: string): Promise<void> {
  return request<void>(`/api/widgets/${id}`, { method: 'DELETE' });
}
