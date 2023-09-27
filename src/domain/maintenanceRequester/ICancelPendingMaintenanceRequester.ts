import { MaintenanceRequester } from './MaintenanceRequester';

interface ICancelPendingMaintenanceRequester {
  cancel(pendingMaintenanceRequests: MaintenanceRequester[]): void;
}

export { ICancelPendingMaintenanceRequester };
