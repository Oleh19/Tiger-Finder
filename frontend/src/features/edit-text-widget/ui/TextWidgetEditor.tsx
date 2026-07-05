import { useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Button, ErrorText, Spinner, Textarea } from '@/shared/ui';

import { TEXT_WIDGET_MAX_LENGTH, type TextWidget } from '@/entities/widget';

import { useUpdateTextWidget } from '../model/useUpdateTextWidget';

export function TextWidgetEditor({ widget }: { widget: TextWidget }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(widget.data.content);
  const update = useUpdateTextWidget();

  const isUnchanged = draft === widget.data.content;

  const startEditing = () => {
    setDraft(widget.data.content);
    update.reset();
    setIsEditing(true);
  };

  const cancel = () => {
    update.reset();
    setIsEditing(false);
  };

  const save = () => {
    update.mutate(
      { id: widget.id, content: draft },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        {widget.data.content === '' ? (
          <p className="text-sm italic text-muted-foreground">
            No content yet.
          </p>
        ) : (
          <p className="whitespace-pre-wrap break-words text-sm">
            {widget.data.content}
          </p>
        )}
        <Button variant="outline" size="sm" onClick={startEditing}>
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        disabled={update.isPending}
        placeholder="Type something…"
        maxLength={TEXT_WIDGET_MAX_LENGTH}
      />
      <p className="text-right text-xs text-muted-foreground">
        {draft.length} / {TEXT_WIDGET_MAX_LENGTH}
      </p>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={save}
          disabled={update.isPending || isUnchanged}
        >
          {update.isPending ? <Spinner /> : <Check className="h-4 w-4" />}
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={cancel}
          disabled={update.isPending}
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
      {update.isError && <ErrorText>{getErrorMessage(update.error)}</ErrorText>}
    </div>
  );
}
