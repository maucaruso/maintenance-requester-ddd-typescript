import { ContractDto } from '@app/maintenanceRequester/ContractDto';
import { IContractFinder } from '@app/maintenanceRequester/IContractFinder';
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';

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

export { makeContractFinder };
