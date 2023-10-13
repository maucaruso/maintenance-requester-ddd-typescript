import { ISubsidiaryRepository } from '@app/subsidiaries/ISubsidiaryRepository';
import { DomainException } from '@domain/DomainException';
import { IUuidAdapter } from '@domain/IUuidAdapter';
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';

import { IContractFinder } from './IContractFinder';
import { MaintenanceRequesterDto } from './MaintenanceRequesterDto';

class MaintenanceRequesterFactory {
  constructor(
    private readonly subsidiaryRepository: ISubsidiaryRepository,
    private readonly contractFinder: IContractFinder,
    private readonly uuid: IUuidAdapter
  ) {}

  public async make(dto: MaintenanceRequesterDto) {
    const subsidiary = await this.subsidiaryRepository.searchById(
      dto.subsidiaryIdentifier
    );

    DomainException.throwsWhen(!subsidiary, 'The subsubsidiary was not found');

    const contractDto = await this.contractFinder.search(dto.contractNumber);

    DomainException.throwsWhen(
      !contractDto,
      'The contract was not found in the ERP'
    );

    return new MaintenanceRequester(
      this.uuid,
      subsidiary.id,
      dto.requesterIdentifier,
      dto.requesterName,
      dto.maintenanceRequestType,
      dto.justification,
      contractDto.number,
      contractDto.outsourcedName,
      contractDto.outsourcedCnpj,
      contractDto.contractMaganer,
      contractDto.finalContractData,
      dto.desiredMaintenanceStartDate
    );
  }
}

export { MaintenanceRequesterFactory };
