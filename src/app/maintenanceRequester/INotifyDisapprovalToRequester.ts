import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';

interface INotifyDisapprovalToRequester {
  notify(maintenanceRequester: MaintenanceRequester): Promise<void>;
}

export { INotifyDisapprovalToRequester };
