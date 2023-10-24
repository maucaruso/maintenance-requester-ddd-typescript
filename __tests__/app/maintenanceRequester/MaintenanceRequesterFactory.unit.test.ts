/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ContractDto } from '@app/maintenanceRequester/ContractDto';
import { IContractFinder } from '@app/maintenanceRequester/IContractFinder';
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { MaintenanceRequesterFactory } from '@app/maintenanceRequester/MaintenanceRequesterFactory';
import { ISubsidiaryRepository } from '@app/subsidiaries/ISubsidiaryRepository';
import { MaintenanceRequestTypeEnum } from '@domain/maintenanceRequester/MaintenanceRequestTypeEnum';
import { Subsidiary } from '@domain/subsidiaries/Subsidiary';
import { increaseMonths } from '@helpers/increaseMonths';
import { UuidAdapter } from '@infra/adapters/UuidAdapter';

jest.mock('@domain/subsidiaries/Subsidiary');

const makeUuidMock = () => {
  const uuidAdapter = new UuidAdapter();
  uuidAdapter.generateUuid = jest.fn().mockReturnValue('any_uuid');
  return { uuidAdapter };
};

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

const makeContractDto = (maintenanceRequestDto: MaintenanceRequesterDto) => {
  const contractDto = Object.assign(new ContractDto(), {
    number: maintenanceRequestDto.contractNumber,
    outsourcedName: 'Grass SA',
    outsourcedCnpj: '00000000000000',
    contractMaganer: 'Edivaldo Pereira',
    finalContractData: increaseMonths(new Date(), 1),
  });

  return { contractDto };
};

const makeSubsidiary = (maintenanceRequestDto: MaintenanceRequesterDto) => {
  const mockedSubsidiary = new Subsidiary() as jest.Mocked<Subsidiary>;
  mockedSubsidiary.id = maintenanceRequestDto.subsidiaryIdentifier;

  return { mockedSubsidiary };
};

const makeSubsidiaryRepository = (subsidiary: Subsidiary) => {
  class SubsidiaryRepository implements ISubsidiaryRepository {
    search(): Promise<Subsidiary[]> {
      throw new Error('Method not implemented.');
    }
    searchById(id: string): Promise<Subsidiary> {
      return subsidiary;
    }
    add(entity: Subsidiary): Promise<void> {
      throw new Error('Method not implemented.');
    }
  }

  const subsidiaryRepository = new SubsidiaryRepository();

  return { subsidiaryRepository };
};

const makeContractFinder = (
  maintenanceRequestDto: MaintenanceRequesterDto,
  contractDto: ContractDto
) => {
  class ContractFinder implements IContractFinder {
    async search(contractNumber: string) {
      return contractDto;
    }
  }

  const contractFinder = new ContractFinder();

  return { contractFinder };
};

const makeSut = (
  subsidiaryRepository: SubsidiaryRepository,
  contractFinder: ContractFinder,
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
