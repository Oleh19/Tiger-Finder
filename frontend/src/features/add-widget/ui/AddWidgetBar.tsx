import { BarChart3, LineChart, Plus, Type } from 'lucide-react';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Button, ErrorText, Spinner } from '@/shared/ui';

import type { WidgetType } from '@/entities/widget';

import { useCreateWidget } from '../model/useCreateWidget';

const OPTIONS: ReadonlyArray<{
  type: WidgetType;
  label: string;
  icon: typeof LineChart;
}> = [
  { type: 'line', label: 'Line chart', icon: LineChart },
  { type: 'bar', label: 'Bar chart', icon: BarChart3 },
  { type: 'text', label: 'Text', icon: Type },
];

export function AddWidgetBar() {
  const create = useCreateWidget();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {OPTIONS.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            disabled={create.isPending}
            onClick={() => create.mutate({ type })}
          >
            {create.isPending && create.variables?.type === type ? (
              <Spinner />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
      {create.isError && <ErrorText>{getErrorMessage(create.error)}</ErrorText>}
    </div>
  );
}
