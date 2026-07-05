import { type HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

export function ErrorText({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      role="alert"
      className={cn('text-xs text-destructive', className)}
      {...props}
    />
  );
}
