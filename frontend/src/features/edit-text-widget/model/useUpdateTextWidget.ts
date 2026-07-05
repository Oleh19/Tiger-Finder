import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWidget, type Widget, widgetKeys } from '@/entities/widget';

interface UpdateTextVariables {
  id: string;
  content: string;
}

interface MutationContext {
  previous: Widget[] | undefined;
}

export function useUpdateTextWidget() {
  const queryClient = useQueryClient();
  return useMutation<Widget, Error, UpdateTextVariables, MutationContext>({
    mutationFn: ({ id, content }) => updateWidget(id, { content }),
    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries({ queryKey: widgetKeys.all });
      const previous = queryClient.getQueryData<Widget[]>(widgetKeys.all);
      queryClient.setQueryData<Widget[]>(widgetKeys.all, (old) =>
        (old ?? []).map((widget) =>
          widget.id === id && widget.type === 'text'
            ? { ...widget, data: { content } }
            : widget,
        ),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(widgetKeys.all, context.previous);
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: widgetKeys.all }),
  });
}
