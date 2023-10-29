import { ContractDto } from '@app/maintenanceRequester/ContractDto';
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { increaseMonths } from '@helpers/increaseMonths';

const makeContractDtoMock = (
  maintenanceRequestDto: MaintenanceRequesterDto
) => {
  const contractDtoMock: ContractDto = {
    number: maintenanceRequestDto.contractNumber,
    outsourcedName: 'Grass SA',
    outsourcedCnpj: '00000000000000',
    contractMaganer: 'Edivaldo Pereira',
    finalContractData: increaseMonths(new Date(), 1),
  };

  return { contractDtoMock };
};

export { makeContractDtoMock };
