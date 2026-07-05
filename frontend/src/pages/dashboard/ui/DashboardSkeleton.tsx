import { Card, CardContent, CardHeader, Skeleton } from '@/shared/ui';

import { WidgetGrid } from './WidgetGrid';

const SKELETON_SLOTS = ['first', 'second', 'third'] as const;

export function DashboardSkeleton() {
  return (
    <WidgetGrid busy>
      {SKELETON_SLOTS.map((slot) => (
        <Card key={slot}>
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[180px] w-full" />
          </CardContent>
        </Card>
      ))}
    </WidgetGrid>
  );
}
