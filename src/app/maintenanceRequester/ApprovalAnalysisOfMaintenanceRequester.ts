import { DomainException } from '@domain/DomainException';
import { Author } from '@domain/maintenanceRequester/Author';
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';

import { ApprovalAnalysisDto } from './ApprovalAnalysisDto';
import { IMaintenanceRequesterRepository } from './IMaintenanceRequesterRepository';
import { INotifyDisapprovalToRequester } from './INotifyDisapprovalToRequester';
import { INotifyServiceContext } from './INotifyServiceContext';

class ApprovalAnalysisOfMaintenanceRequester {
  constructor(
    private readonly maintenanceRequesterRepository: IMaintenanceRequesterRepository,
    private readonly notifyDisapprovalToRequester: INotifyDisapprovalToRequester,
    private readonly notifyServiceContext: INotifyServiceContext
  ) {}

  public async analyze(approvalAnalysisDto: ApprovalAnalysisDto) {
    const maintenanceRequest =
      await this.maintenanceRequesterRepository.searchById(
        approvalAnalysisDto.requestIdentifier
      );

    DomainException.throwsWhen(
      !maintenanceRequest,
      'Maintenence request not found'
    );

    DomainException.throwsWhen(
      maintenanceRequest.disapproved(),
      'This maintenance request was disapproved'
    );

    DomainException.throwsWhen(
      maintenanceRequest.approved(),
      'This maintenance request was approved'
    );

    const approver = new Author(
      approvalAnalysisDto.approverIdentifier,
      approvalAnalysisDto.approverName
    );

    if (approvalAnalysisDto.approved) {
      await this.approve(maintenanceRequest, approver);
      return;
    }

    await this.disapprove(maintenanceRequest, approver);
  }

  private async approve(
    maintenanceRequest: MaintenanceRequester,
    approver: Author
  ) {
    maintenanceRequest.approve(approver);
    await this.notifyServiceContext.notify(maintenanceRequest);
  }

  private async disapprove(
    maintenanceRequest: MaintenanceRequester,
    approver: Author
  ) {
    maintenanceRequest.disapprove(approver);
    await this.notifyDisapprovalToRequester.notify(maintenanceRequest);
  }
}

export { ApprovalAnalysisOfMaintenanceRequester };
