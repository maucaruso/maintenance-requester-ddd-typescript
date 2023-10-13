import { MaintenanceRequestTypeEnum } from '@domain/maintenanceRequester/MaintenanceRequestTypeEnum';

class MaintenanceRequesterDto {
  subsidiaryIdentifier: string;
  requesterIdentifier: number;
  requesterName: string;
  maintenanceRequestType: MaintenanceRequestTypeEnum;
  justification: string;
  contractNumber: string;
  desiredMaintenanceStartDate: Date;
}

export { MaintenanceRequesterDto };
