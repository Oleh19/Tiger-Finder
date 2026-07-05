import { AlertCircle } from 'lucide-react';

import { Button, Card, CardContent } from '@/shared/ui';

interface DashboardErrorProps {
  message: string;
  onRetry: () => void;
  retrying: boolean;
}

export function DashboardError({
  message,
  onRetry,
  retrying,
}: DashboardErrorProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <div className="space-y-1">
          <p className="font-medium">Failed to load widgets</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <Button variant="outline" onClick={onRetry} disabled={retrying}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
