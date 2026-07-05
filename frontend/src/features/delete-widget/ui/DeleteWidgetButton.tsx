import { Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui';

interface DeleteWidgetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function DeleteWidgetButton({
  onClick,
  disabled = false,
}: DeleteWidgetButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Delete widget"
      onClick={onClick}
      disabled={disabled}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
