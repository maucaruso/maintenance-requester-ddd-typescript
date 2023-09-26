import { Contract } from '@domain/maintenanceRequester/Contract';
import { decreaseDays } from '@helpers/decreaseDays';
import { increaseMonths } from '@helpers/increaseMonths';

const number = '224587';
const outsourcedName = 'Gramas SA';
const outsourcedCnpj = '90994785000158';
const contractMaganer = 'Hugo Alvez';
const finalContractData = increaseMonths(new Date(), 1);

describe('Contract Value Object Test', () => {
  it('Should create a contract', () => {
    const expectedContract = {
      number,
      outsourcedName,
      outsourcedCnpj,
      contractMaganer,
      finalContractData,
    };

    const contract = new Contract(
      number,
      outsourcedName,
      outsourcedCnpj,
      contractMaganer,
      finalContractData
    );

    expect(contract).toEqual(expectedContract);
  });

  test.each([
    ['invalid contract number', ''],
    ['invalid contract number', null],
  ])('Should validate the contract number', (_key, invalidContractNumber) => {
    const expectedMessage = 'Invalid contract number';

    expect(
      () =>
        new Contract(
          invalidContractNumber,
          outsourcedName,
          outsourcedCnpj,
          contractMaganer,
          finalContractData
        )
    ).toThrow(expectedMessage);
  });

  test.each([
    ['invalid outsourced name', ''],
    ['invalid outsourced name', null],
  ])('Should validate the outsourced name', (_key, invalidOutsourcedName) => {
    const expectedMessage = 'Invalid outsourced name';

    expect(
      () =>
        new Contract(
          number,
          invalidOutsourcedName,
          outsourcedCnpj,
          contractMaganer,
          finalContractData
        )
    ).toThrow(expectedMessage);
  });

  test.each([
    ['invalid outsourced cnpj', ''],
    ['invalid outsourced cnpj', null],
    ['invalid outsourced cnpj', '0994785000158'],
  ])('Should validate the outsourced cnpj', (_key, invalidOutsourcedCnpj) => {
    const expectedMessage = 'Invalid outsourced CNPJ number';

    expect(
      () =>
        new Contract(
          number,
          outsourcedName,
          invalidOutsourcedCnpj,
          contractMaganer,
          finalContractData
        )
    ).toThrow(expectedMessage);
  });

  test.each([
    ['invalid contract maganer', ''],
    ['invalid contract maganer', null],
  ])('Should validate the contract manager', (_key, invalidContractManager) => {
    const expectedMessage = 'Invalid contract maganer';

    expect(
      () =>
        new Contract(
          number,
          outsourcedName,
          outsourcedCnpj,
          invalidContractManager,
          finalContractData
        )
    ).toThrow(expectedMessage);
  });

  test.each([
    ['invalid contract maganer', ''],
    ['invalid contract maganer', null],
  ])('Should validate the contract manager', (_key, invalidContractManager) => {
    const expectedMessage = 'Invalid contract maganer';

    expect(
      () =>
        new Contract(
          number,
          outsourcedName,
          outsourcedCnpj,
          invalidContractManager,
          finalContractData
        )
    ).toThrow(expectedMessage);
  });

  it('Should validate the contract expiration date', () => {
    const expectedMessage = 'The contract is expired';
    const invalidFinalContractData = decreaseDays(new Date(), 1);

    expect(
      () =>
        new Contract(
          number,
          outsourcedName,
          outsourcedCnpj,
          contractMaganer,
          invalidFinalContractData
        )
    ).toThrow(expectedMessage);
  });
});
