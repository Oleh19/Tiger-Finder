import { type ReactNode } from 'react';

export function WidgetGrid({
  children,
  busy = false,
}: {
  children: ReactNode;
  busy?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy={busy}
    >
      {children}
    </div>
  );
}
