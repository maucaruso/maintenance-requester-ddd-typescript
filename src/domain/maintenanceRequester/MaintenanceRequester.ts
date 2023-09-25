import { DomainException } from '@domain/DomainException';
import { Entity } from '@domain/Entity';
import { IUuidAdapter } from '@domain/IUuidAdapter';
import { isNullOrEmpty } from '@helpers/isNullOrEmpty';

import { Author } from './Author';
import { Contract } from './Contract';
import { MaintenanceRequestTypeEnum } from './MaintenanceRequestTypeEnum';
import { RequestStatusEnum } from './RequestStatusEnum';

class MaintenanceRequester extends Entity {
  public readonly requester: Author;
  private approver: Author;
  public readonly subsidiaryIdentifier: string;
  public readonly maintenanceRequestType: MaintenanceRequestTypeEnum;
  public readonly justification: string;
  public readonly contract: Contract;
  public readonly desiredMaintenanceStartDate: Date;
  public readonly requestDate: Date;
  private requestStatus: RequestStatusEnum;

  constructor(
    uuid: IUuidAdapter,
    subsidiaryIdentifier: string,
    requesterIdentifier: number,
    requesterName: string,
    maintenanceRequestType: MaintenanceRequestTypeEnum,
    justification: string,
    contractNumber: string,
    outsourcedName: string,
    outsourcedCnpj: string,
    contractMaganer: string,
    finalContractData: Date,
    desiredMaintenanceStartDate: Date
  ) {
    super(uuid);

    DomainException.throwsWhen(
      isNullOrEmpty(subsidiaryIdentifier),
      'Invalid subsidiary identifier'
    );

    DomainException.throwsWhen(
      isNullOrEmpty(justification),
      'Invalid justification'
    );

    DomainException.throwsWhen(
      desiredMaintenanceStartDate.getTime() < new Date().getTime(),
      'The desired maintenance start date cannot be less than the current date'
    );

    this.requester = new Author(requesterIdentifier, requesterName);
    this.subsidiaryIdentifier = subsidiaryIdentifier;
    this.maintenanceRequestType = maintenanceRequestType;
    this.justification = justification;
    this.contract = new Contract(
      contractNumber,
      outsourcedName,
      outsourcedCnpj,
      contractMaganer,
      finalContractData
    );
    this.desiredMaintenanceStartDate = desiredMaintenanceStartDate;
    this.requestDate = new Date();
    this.requestStatus = RequestStatusEnum.Pending;

    // TODO: Por motivos do EF Core, sempre um owned deve ser atribuido :(.
    this.approver = new Author(0, 'No approver');
  }

  public cancel() {
    this.requestStatus = RequestStatusEnum.Canceled;
  }

  public disapprove(approver: Author) {
    this.requestStatus = RequestStatusEnum.Disapproved;
    this.approver = approver;
  }

  public approve(approver: Author) {
    this.requestStatus = RequestStatusEnum.Approved;
    this.approver = approver;
  }

  public disapproved() {
    return this.requestStatus === RequestStatusEnum.Disapproved;
  }

  public approved() {
    return this.requestStatus === RequestStatusEnum.Approved;
  }
}

export { MaintenanceRequester };
