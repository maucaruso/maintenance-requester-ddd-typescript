import { ICancelPendingMaintenanceRequester } from '@domain/maintenanceRequester/ICancelPendingMaintenanceRequester';

import { IMaintenanceRequesterRepository } from './IMaintenanceRequesterRepository';
import { MaintenanceRequesterDto } from './MaintenanceRequesterDto';
import { MaintenanceRequesterFactory } from './MaintenanceRequesterFactory';

class MaintenanceRequester {
  constructor(
    private readonly maintenanceRequesterRepository: IMaintenanceRequesterRepository,
    private readonly maintenanceRequesterFactory: MaintenanceRequesterFactory,
    private readonly cancelPendingMaintenanceRequester: ICancelPendingMaintenanceRequester
  ) {}

  public async request(dto: MaintenanceRequesterDto) {
    const maintenanceRequest = await this.maintenanceRequesterFactory.make(dto);

    const pendingMaintenanceRequests =
      await this.maintenanceRequesterRepository.getPendingsByType(
        maintenanceRequest.maintenanceRequestType,
        maintenanceRequest.subsidiaryIdentifier
      );

    await this.cancelPendingMaintenanceRequester.cancel(
      pendingMaintenanceRequests
    );

    await this.maintenanceRequesterRepository.add(maintenanceRequest);
  }
}

export { MaintenanceRequester };
