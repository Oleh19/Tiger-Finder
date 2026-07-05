import { type KeyboardEvent, useState } from 'react';
import { Check, X } from 'lucide-react';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Button, ErrorText, Spinner, Textarea } from '@/shared/ui';

import { TEXT_WIDGET_MAX_LENGTH, type TextWidget } from '@/entities/widget';

import { useUpdateTextWidget } from '../model/useUpdateTextWidget';

interface TextWidgetEditorProps {
  widget: TextWidget;
  onClose: () => void;
}

export function TextWidgetEditor({ widget, onClose }: TextWidgetEditorProps) {
  const [draft, setDraft] = useState(widget.data.content);
  const update = useUpdateTextWidget();

  const isUnchanged = draft === widget.data.content;

  const save = () => {
    update.mutate({ id: widget.id, content: draft }, { onSuccess: onClose });
  };

  const handleEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape' && !update.isPending) {
      onClose();
      return;
    }
    if (
      event.key === 'Enter' &&
      (event.metaKey || event.ctrlKey) &&
      !update.isPending &&
      !isUnchanged
    ) {
      save();
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleEditorKeyDown}
        disabled={update.isPending}
        placeholder="Type something…"
        maxLength={TEXT_WIDGET_MAX_LENGTH}
        aria-label="Text widget content"
        autoFocus
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
          onClick={onClose}
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
