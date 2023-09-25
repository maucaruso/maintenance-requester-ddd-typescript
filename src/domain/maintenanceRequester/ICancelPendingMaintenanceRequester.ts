import { MaintenanceRequester } from './MaintenanceRequester';

interface ICancelPendingMaintenanceRequester {
  cancelar(maintenanceRequester: MaintenanceRequester): void;
}

export { ICancelPendingMaintenanceRequester };
