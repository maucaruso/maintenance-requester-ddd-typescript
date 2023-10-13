import { IRepository } from '@app/IRepository';
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';
import { MaintenanceRequestTypeEnum } from '@domain/maintenanceRequester/MaintenanceRequestTypeEnum';

interface IMaintenanceRequesterRepository
  extends IRepository<MaintenanceRequester> {
  getPendingsByType(
    maintenanceRequestType: MaintenanceRequestTypeEnum,
    subsidiaryIdentifier: string
  ): Promise<MaintenanceRequester[]>;

  getPendingsFrom(requesterIdentifier: string): Promise<MaintenanceRequester[]>;
}

export { IMaintenanceRequesterRepository };
