import { AlertCircle } from 'lucide-react';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Button } from '@/shared/ui';

import { useWidgets } from '@/entities/widget';

import { AddWidgetBar } from '@/features/add-widget';

import { DashboardError } from './DashboardError';
import { DashboardSkeleton } from './DashboardSkeleton';
import { EmptyState } from './EmptyState';
import { WidgetGrid } from './WidgetGrid';
import { WidgetTile } from './WidgetTile';

export function DashboardPage() {
  const {
    data: widgets,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useWidgets();

  const renderContent = () => {
    if (isPending) {
      return <DashboardSkeleton />;
    }
    if (isError && widgets === undefined) {
      return (
        <DashboardError
          message={getErrorMessage(error)}
          onRetry={() => void refetch()}
          retrying={isFetching}
        />
      );
    }
    const items = widgets ?? [];
    if (items.length === 0) {
      return <EmptyState />;
    }
    return (
      <div className="space-y-4">
        {isError && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-destructive/50 px-4 py-3 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="h-4 w-4 text-destructive" />
              Couldn’t refresh widgets — showing the last loaded version.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void refetch()}
              disabled={isFetching}
            >
              Try again
            </Button>
          </div>
        )}
        <WidgetGrid>
          {items.map((widget) => (
            <WidgetTile key={widget.id} widget={widget} />
          ))}
        </WidgetGrid>
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Add line charts, bar charts, and editable text widgets.
          </p>
        </div>
        <AddWidgetBar />
      </header>
      {renderContent()}
    </main>
  );
}
