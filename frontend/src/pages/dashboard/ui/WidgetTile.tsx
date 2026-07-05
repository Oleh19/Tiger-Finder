import { useState } from 'react';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';

import {
  TextWidgetContent,
  useWidgets,
  type Widget,
  WidgetCard,
  WidgetChart,
  widgetTypeLabel,
} from '@/entities/widget';

import { DeleteWidgetButton, useDeleteWidget } from '@/features/delete-widget';
import {
  EditTextWidgetButton,
  TextWidgetEditor,
} from '@/features/edit-text-widget';

export function WidgetTile({ widget }: { widget: Widget }) {
  const del = useDeleteWidget();
  const { dataUpdatedAt } = useWidgets();
  const [isEditing, setIsEditing] = useState(false);

  const showDeleteError = del.isError && del.submittedAt > dataUpdatedAt;

  const renderContent = () => {
    if (widget.type !== 'text') {
      return <WidgetChart widget={widget} />;
    }
    if (isEditing) {
      return (
        <TextWidgetEditor widget={widget} onClose={() => setIsEditing(false)} />
      );
    }
    return <TextWidgetContent content={widget.data.content} />;
  };

  return (
    <WidgetCard
      title={widgetTypeLabel(widget.type)}
      actions={
        <>
          {widget.type === 'text' && !isEditing && (
            <EditTextWidgetButton
              onClick={() => setIsEditing(true)}
              disabled={del.isPending}
            />
          )}
          <DeleteWidgetButton
            onClick={() => del.mutate(widget.id)}
            disabled={del.isPending}
          />
        </>
      }
      busy={del.isPending}
      error={showDeleteError ? getErrorMessage(del.error) : null}
    >
      {renderContent()}
    </WidgetCard>
  );
}
