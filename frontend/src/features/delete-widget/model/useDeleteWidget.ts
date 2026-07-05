import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWidget, type Widget, widgetKeys } from '@/entities/widget';

export function useDeleteWidget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWidget(id),
    onSuccess: (_result, id) => {
      queryClient.setQueryData<Widget[]>(widgetKeys.all, (old) =>
        (old ?? []).filter((widget) => widget.id !== id),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: widgetKeys.all }),
  });
}
