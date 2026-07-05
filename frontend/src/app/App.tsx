import { ErrorBoundary } from '@/shared/ui';

import { DashboardPage } from '@/pages/dashboard';

import { AppProviders } from './providers';

export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <DashboardPage />
      </AppProviders>
    </ErrorBoundary>
  );
}
