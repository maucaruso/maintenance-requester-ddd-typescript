import { IContractFinder } from '@app/maintenanceRequester/IContractFinder';
import { MaintenanceRequesterFactory } from '@app/maintenanceRequester/MaintenanceRequesterFactory';
import { ISubsidiaryRepository } from '@app/subsidiaries/ISubsidiaryRepository';
import { UuidAdapter } from '@infra/adapters/UuidAdapter';

import { makeContractDto } from '../__mocks__/makeContractDto';
import { makeContractFinder } from '../__mocks__/makeContractFinder';
import { makeMaintenanceRequestDto } from '../__mocks__/makeMaintenanceRequestDto';
import { makeSubsidiary } from '../__mocks__/makeSubsidiary';
import { makeSubsidiaryRepository } from '../__mocks__/makeSubsidiaryRepository';
import { makeUuidMock } from '../__mocks__/makeUuidMock';

const makeSut = (
  subsidiaryRepository: ISubsidiaryRepository,
  contractFinder: IContractFinder,
  uuidMock: UuidAdapter
) => {
  const sut = new MaintenanceRequesterFactory(
    subsidiaryRepository,
    contractFinder,
    uuidMock
  );

  return { sut };
};

describe('Maintenance Requester Factory', () => {
  it('The maintenance request should have the searched contract data', async () => {
    const { uuidAdapter } = makeUuidMock();
    const { maintenanceRequestDto } = makeMaintenanceRequestDto();
    const { contractDto } = makeContractDto(maintenanceRequestDto);
    const { mockedSubsidiary } = makeSubsidiary(maintenanceRequestDto);
    const { subsidiaryRepository } = makeSubsidiaryRepository(mockedSubsidiary);
    const { contractFinder } = makeContractFinder(
      maintenanceRequestDto,
      contractDto
    );
    const { sut } = makeSut(subsidiaryRepository, contractFinder, uuidAdapter);

    const createdRequest = await sut.make(maintenanceRequestDto);

    expect(createdRequest.contract.number).toBe(contractDto.number);
  });

  it('Should validate the contract when not found in the ERP', async () => {
    const { uuidAdapter } = makeUuidMock();
    const { maintenanceRequestDto } = makeMaintenanceRequestDto();
    const { contractDto } = makeContractDto(maintenanceRequestDto);
    const { mockedSubsidiary } = makeSubsidiary(maintenanceRequestDto);
    const { subsidiaryRepository } = makeSubsidiaryRepository(mockedSubsidiary);
    const { contractFinder } = makeContractFinder(
      maintenanceRequestDto,
      contractDto
    );
    contractFinder.search = (contractNumber: string) => {
      return null;
    };
    const { sut } = makeSut(subsidiaryRepository, contractFinder, uuidAdapter);

    const expectedMessage = 'The contract was not found in the ERP';

    expect(() => sut.make(maintenanceRequestDto)).rejects.toThrow(
      expectedMessage
    );
  });

  it('The created request should contain the subsidiary', async () => {
    const { uuidAdapter } = makeUuidMock();
    const { maintenanceRequestDto } = makeMaintenanceRequestDto();
    const { contractDto } = makeContractDto(maintenanceRequestDto);
    const { mockedSubsidiary } = makeSubsidiary(maintenanceRequestDto);
    const { subsidiaryRepository } = makeSubsidiaryRepository(mockedSubsidiary);
    const { contractFinder } = makeContractFinder(
      maintenanceRequestDto,
      contractDto
    );
    const { sut } = makeSut(subsidiaryRepository, contractFinder, uuidAdapter);

    const createdRequest = await sut.make(maintenanceRequestDto);

    expect(createdRequest.subsidiaryIdentifier).toBe(mockedSubsidiary.id);
  });

  it('Should validate the subsidiary when not found', async () => {
    const { uuidAdapter } = makeUuidMock();
    const { maintenanceRequestDto } = makeMaintenanceRequestDto();
    const { contractDto } = makeContractDto(maintenanceRequestDto);
    const { mockedSubsidiary } = makeSubsidiary(maintenanceRequestDto);
    const { subsidiaryRepository } = makeSubsidiaryRepository(mockedSubsidiary);
    const { contractFinder } = makeContractFinder(
      maintenanceRequestDto,
      contractDto
    );
    subsidiaryRepository.searchById = (id: string) => {
      return null;
    };
    const { sut } = makeSut(subsidiaryRepository, contractFinder, uuidAdapter);

    const expectedMessage = 'The subsubsidiary was not found';

    expect(() => sut.make(maintenanceRequestDto)).rejects.toThrow(
      expectedMessage
    );
  });
});
