import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import {
  useWidgets,
  type Widget,
  WidgetCard,
  WidgetChart,
  widgetTypeLabel,
} from '@/entities/widget';

import { DeleteWidgetButton, useDeleteWidget } from '@/features/delete-widget';
import { TextWidgetEditor } from '@/features/edit-text-widget';

export function WidgetTile({ widget }: { widget: Widget }) {
  const del = useDeleteWidget();
  const { dataUpdatedAt } = useWidgets();
  const showDeleteError = del.isError && del.submittedAt > dataUpdatedAt;

  return (
    <WidgetCard
      title={widgetTypeLabel(widget.type)}
      actions={
        <DeleteWidgetButton
          onClick={() => del.mutate(widget.id)}
          disabled={del.isPending}
        />
      }
      busy={del.isPending}
      error={showDeleteError ? getErrorMessage(del.error) : null}
    >
      {widget.type === 'text' ? (
        <TextWidgetEditor widget={widget} />
      ) : (
        <WidgetChart widget={widget} />
      )}
    </WidgetCard>
  );
}
