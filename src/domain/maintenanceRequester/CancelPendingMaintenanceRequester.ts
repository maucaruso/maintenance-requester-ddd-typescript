import { ICancelPendingMaintenanceRequester } from './ICancelPendingMaintenanceRequester';
import { MaintenanceRequester } from './MaintenanceRequester';

class CancelPendingMaintenanceRequester
  implements ICancelPendingMaintenanceRequester
{
  async cancel(pendingMaintenanceRequests: MaintenanceRequester[]) {
    if (!pendingMaintenanceRequests) {
      return;
    }

    pendingMaintenanceRequests.forEach((pendingMaintenanceRequest) => {
      pendingMaintenanceRequest.cancel();
    });
  }
}

export { CancelPendingMaintenanceRequester };
