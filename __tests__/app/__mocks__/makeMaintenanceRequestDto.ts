import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { MaintenanceRequestTypeEnum } from '@domain/maintenanceRequester/MaintenanceRequestTypeEnum';
import { increaseMonths } from '@helpers/increaseMonths';

const makeMaintenanceRequestDto = () => {
  const maintenanceRequestDto = Object.assign(new MaintenanceRequesterDto(), {
    subsidiaryIdentifier: 'XPTO-ABC',
    requesterIdentifier: 1,
    requesterName: 'Ricardo José',
    maintenanceRequestType: MaintenanceRequestTypeEnum.Gardening,
    justification: 'High Grass',
    contractNumber: '2135',
    desiredMaintenanceStartDate: increaseMonths(new Date(), 2),
  });

  return { maintenanceRequestDto };
};

export { makeMaintenanceRequestDto };
