import { ContractDto } from './ContractDto';

interface IContractFinder {
  search(): Promise<ContractDto>;
}

export { IContractFinder };
