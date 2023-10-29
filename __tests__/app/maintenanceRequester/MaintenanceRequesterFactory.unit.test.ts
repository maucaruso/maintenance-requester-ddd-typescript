import { IContractFinder } from '@app/maintenanceRequester/IContractFinder';
import { MaintenanceRequesterFactory } from '@app/maintenanceRequester/MaintenanceRequesterFactory';
import { ISubsidiaryRepository } from '@app/subsidiaries/ISubsidiaryRepository';
import { UuidAdapter } from '@infra/adapters/UuidAdapter';

import { makeContractDtoMock } from '../__mocks__/makeContractDtoMock';
import { makeContractFinderMock } from '../__mocks__/makeContractFinderMock';
import { makeMaintenanceRequestDtoMock } from '../__mocks__/makeMaintenanceRequestDtoMock';
import { makeSubsidiaryMock } from '../__mocks__/makeSubsidiaryMock';
import { makeSubsidiaryRepositoryMock } from '../__mocks__/makeSubsidiaryRepositoryMock';
import { makeUuidAdapterMock } from '../__mocks__/makeUuidAdapterMock';

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
    const { uuidAdapterMock } = makeUuidAdapterMock();
    const { maintenanceRequestDtoMock } = makeMaintenanceRequestDtoMock();
    const { contractDtoMock } = makeContractDtoMock(maintenanceRequestDtoMock);
    const { subsidiaryMock } = makeSubsidiaryMock(maintenanceRequestDtoMock);
    const { subsidiaryRepositoryMock } =
      makeSubsidiaryRepositoryMock(subsidiaryMock);
    const { contractFinderMock } = makeContractFinderMock(
      maintenanceRequestDtoMock,
      contractDtoMock
    );
    const { sut } = makeSut(
      subsidiaryRepositoryMock,
      contractFinderMock,
      uuidAdapterMock
    );

    const createdRequest = await sut.make(maintenanceRequestDtoMock);

    expect(createdRequest.contract.number).toBe(contractDtoMock.number);
  });

  it('Should validate the contract when not found in the ERP', async () => {
    const { uuidAdapterMock } = makeUuidAdapterMock();
    const { maintenanceRequestDtoMock } = makeMaintenanceRequestDtoMock();
    const { contractDtoMock } = makeContractDtoMock(maintenanceRequestDtoMock);
    const { subsidiaryMock } = makeSubsidiaryMock(maintenanceRequestDtoMock);
    const { subsidiaryRepositoryMock } =
      makeSubsidiaryRepositoryMock(subsidiaryMock);
    const { contractFinderMock } = makeContractFinderMock(
      maintenanceRequestDtoMock,
      contractDtoMock
    );
    contractFinderMock.search = (contractNumber: string) => {
      return null;
    };
    const { sut } = makeSut(
      subsidiaryRepositoryMock,
      contractFinderMock,
      uuidAdapterMock
    );

    const expectedMessage = 'The contract was not found in the ERP';

    expect(() => sut.make(maintenanceRequestDtoMock)).rejects.toThrow(
      expectedMessage
    );
  });

  it('The created request should contain the subsidiary', async () => {
    const { uuidAdapterMock } = makeUuidAdapterMock();
    const { maintenanceRequestDtoMock } = makeMaintenanceRequestDtoMock();
    const { contractDtoMock } = makeContractDtoMock(maintenanceRequestDtoMock);
    const { subsidiaryMock } = makeSubsidiaryMock(maintenanceRequestDtoMock);
    const { subsidiaryRepositoryMock } =
      makeSubsidiaryRepositoryMock(subsidiaryMock);
    const { contractFinderMock } = makeContractFinderMock(
      maintenanceRequestDtoMock,
      contractDtoMock
    );
    const { sut } = makeSut(
      subsidiaryRepositoryMock,
      contractFinderMock,
      uuidAdapterMock
    );

    const createdRequest = await sut.make(maintenanceRequestDtoMock);

    expect(createdRequest.subsidiaryIdentifier).toBe(subsidiaryMock.id);
  });

  it('Should validate the subsidiary when not found', async () => {
    const { uuidAdapterMock } = makeUuidAdapterMock();
    const { maintenanceRequestDtoMock } = makeMaintenanceRequestDtoMock();
    const { contractDtoMock } = makeContractDtoMock(maintenanceRequestDtoMock);
    const { subsidiaryMock } = makeSubsidiaryMock(maintenanceRequestDtoMock);
    const { subsidiaryRepositoryMock } =
      makeSubsidiaryRepositoryMock(subsidiaryMock);
    const { contractFinderMock } = makeContractFinderMock(
      maintenanceRequestDtoMock,
      contractDtoMock
    );
    subsidiaryRepositoryMock.searchById = (id: string) => {
      return null;
    };
    const { sut } = makeSut(
      subsidiaryRepositoryMock,
      contractFinderMock,
      uuidAdapterMock
    );

    const expectedMessage = 'The subsubsidiary was not found';

    expect(() => sut.make(maintenanceRequestDtoMock)).rejects.toThrow(
      expectedMessage
    );
  });
});
