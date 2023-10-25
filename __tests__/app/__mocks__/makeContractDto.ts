import { ContractDto } from '@app/maintenanceRequester/ContractDto';
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { increaseMonths } from '@helpers/increaseMonths';

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

export { makeContractDto };
