import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui';

const CONFIRM_WINDOW_MS = 4000;

interface DeleteWidgetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function DeleteWidgetButton({
  onClick,
  disabled = false,
}: DeleteWidgetButtonProps) {
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    if (!isArmed) {
      return;
    }
    const timer = window.setTimeout(() => setIsArmed(false), CONFIRM_WINDOW_MS);
    return () => window.clearTimeout(timer);
  }, [isArmed]);

  const handleClick = () => {
    if (!isArmed) {
      setIsArmed(true);
      return;
    }
    setIsArmed(false);
    onClick();
  };

  return (
    <Button
      variant={isArmed ? 'destructive' : 'ghost'}
      size="icon"
      aria-label={isArmed ? 'Confirm delete widget' : 'Delete widget'}
      title={isArmed ? 'Click again to confirm' : 'Delete widget'}
      onClick={handleClick}
      onBlur={() => setIsArmed(false)}
      disabled={disabled}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
