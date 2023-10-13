import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';

interface INotifyServiceContext {
  notify(maintenanceRequester: MaintenanceRequester): Promise<void>;
}

export { INotifyServiceContext };
