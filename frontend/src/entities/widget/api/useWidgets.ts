import { useQuery } from '@tanstack/react-query';

import { fetchWidgets, widgetKeys } from './widgetApi';

export function useWidgets() {
  return useQuery({
    queryKey: widgetKeys.all,
    queryFn: fetchWidgets,
  });
}
