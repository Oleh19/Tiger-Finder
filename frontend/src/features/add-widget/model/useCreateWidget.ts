import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createWidget,
  type CreateWidgetInput,
  widgetKeys,
} from '@/entities/widget';

export function useCreateWidget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateWidgetInput) => createWidget(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: widgetKeys.all }),
  });
}
