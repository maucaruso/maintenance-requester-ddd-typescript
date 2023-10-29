import { ContractDto } from '@app/maintenanceRequester/ContractDto';
import { IContractFinder } from '@app/maintenanceRequester/IContractFinder';
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';

const makeContractFinderMock = (
  maintenanceRequestDto: MaintenanceRequesterDto,
  contractDto: ContractDto
) => {
  const contractFinderMock: IContractFinder = {
    search: jest.fn().mockReturnValue(Promise.resolve(contractDto)),
  };

  return { contractFinderMock };
};

export { makeContractFinderMock };
