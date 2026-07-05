import { type ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ErrorText,
  Spinner,
} from '@/shared/ui';

interface WidgetCardProps {
  title: string;
  actions?: ReactNode;
  error?: string | null;
  busy?: boolean;
  children: ReactNode;
}

export function WidgetCard({
  title,
  actions,
  error,
  busy = false,
  children,
}: WidgetCardProps) {
  return (
    <Card className="relative flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        {actions !== undefined && (
          <div className="flex items-center gap-1">{actions}</div>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        {children}
        {error != null && error !== '' && <ErrorText>{error}</ErrorText>}
      </CardContent>
      {busy && (
        <div className="absolute inset-0 grid place-items-center rounded-lg bg-background/60">
          <Spinner className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </Card>
  );
}
