import { DomainException } from '@domain/DomainException';
import { isNullOrEmpty } from '@helpers/isNullOrEmpty';

class Contract {
  public readonly number: string;
  public readonly outsourcedName: string;
  public readonly outsourcedCnpj: string;
  public readonly contractMaganer: string;
  public readonly finalContractData: Date;

  constructor(
    number: string,
    outsourcedName: string,
    outsourcedCnpj: string,
    contractMaganer: string,
    finalContractData: Date
  ) {
    DomainException.throwsWhen(
      isNullOrEmpty(number),
      'Invalid contract number'
    );

    DomainException.throwsWhen(
      isNullOrEmpty(outsourcedName),
      'Invalid outsourced name'
    );

    DomainException.throwsWhen(
      isNullOrEmpty(outsourcedCnpj) || outsourcedCnpj.length !== 14,
      'Invalid outsourced CNPJ number'
    );

    DomainException.throwsWhen(
      isNullOrEmpty(contractMaganer),
      'Invalid contract maganer'
    );

    DomainException.throwsWhen(
      finalContractData.getTime() < new Date().getTime(),
      'The contract is expired'
    );

    this.number = number;
    this.outsourcedName = outsourcedName;
    this.outsourcedCnpj = outsourcedCnpj;
    this.contractMaganer = contractMaganer;
    this.finalContractData = finalContractData;
  }
}

export { Contract };
