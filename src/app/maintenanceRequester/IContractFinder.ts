import { ContractDto } from './ContractDto';

interface IContractFinder {
  search(contractNumber: string): Promise<ContractDto>;
}

export { IContractFinder };
