import { MaintenanceRequester } from './MaintenanceRequester';

interface ICancelPendingMaintenanceRequester {
  cancel(pendingMaintenanceRequests: MaintenanceRequester[]): Promise<void>;
}

export { ICancelPendingMaintenanceRequester };
