import { Pencil } from 'lucide-react';

import { Button } from '@/shared/ui';

interface EditTextWidgetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function EditTextWidgetButton({
  onClick,
  disabled = false,
}: EditTextWidgetButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Edit text"
      title="Edit text"
      onClick={onClick}
      disabled={disabled}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
