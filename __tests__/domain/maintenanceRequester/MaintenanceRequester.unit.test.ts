/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';
import { MaintenanceRequestTypeEnum } from '@domain/maintenanceRequester/MaintenanceRequestTypeEnum';
import { RequestStatusEnum } from '@domain/maintenanceRequester/RequestStatusEnum';
import { increaseMonths } from '@helpers/increaseMonths';
import { UuidAdapter } from '@infra/adapters/UuidAdapter';

let sutMock: MaintenanceRequester = {};

const makeUuidMock = () => {
  const uuidAdapter = new UuidAdapter();
  uuidAdapter.generateUuid = jest.fn().mockReturnValue(sutMock.id);
  return uuidAdapter;
};

const makeSut = () => {
  const maintenanceRequest = new MaintenanceRequester(
    makeUuidMock(),
    sutMock.subsidiaryIdentifier,
    sutMock.requester.identifier,
    sutMock.requester.name,
    sutMock.maintenanceRequestType,
    sutMock.justification,
    sutMock.contract.number,
    sutMock.contract.outsourcedName,
    sutMock.contract.outsourcedCnpj,
    sutMock.contract.contractMaganer,
    sutMock.contract.finalContractData,
    sutMock.desiredMaintenanceStartDate
  );

  return maintenanceRequest;
};

describe('Maintenance Requester Entity Test', () => {
  beforeEach(() => {
    sutMock = {
      id: 'any_uuid',
      requester: { identifier: 123, name: 'any_requester_name' },
      subsidiaryIdentifier: 'any_subsidiary_identifier',
      maintenanceRequestType: MaintenanceRequestTypeEnum.Painting,
      justification: 'any_justification',
      contract: {
        number: 'any_contract_number',
        outsourcedName: 'any_outsourced_name',
        outsourcedCnpj: 'any_outso_cnpj',
        contractMaganer: 'any_contract_maganer',
        finalContractData: increaseMonths(new Date(), 2),
      },
      desiredMaintenanceStartDate: increaseMonths(new Date(), 1),
      requestDate: new Date(),
      requestStatus: RequestStatusEnum.Pending,
      approver: { identifier: 0, name: 'No approver' },
    };
  });

  it('Should create a new maintenance request', () => {
    const sut = makeSut();

    expect(sut).toHaveProperty('id', sutMock.id);
    expect(sut).toHaveProperty('requester', sutMock.requester);
    expect(sut).toHaveProperty(
      'subsidiaryIdentifier',
      sutMock.subsidiaryIdentifier
    );
    expect(sut).toHaveProperty(
      'maintenanceRequestType',
      sutMock.maintenanceRequestType
    );
    expect(sut).toHaveProperty('justification', sutMock.justification);
    expect(sut).toHaveProperty('contract', sutMock.contract);
    expect(sut).toHaveProperty(
      'desiredMaintenanceStartDate',
      sutMock.desiredMaintenanceStartDate
    );
    expect(sut).toHaveProperty('requestDate');
    expect(sut.requestDate).toBeInstanceOf(Date);
    expect(sut).toHaveProperty('requestStatus', sutMock.requestStatus);
    expect(sut).toHaveProperty('approver', sutMock.approver);
  });

  it('The date of the maintenance request must be the same as the current date', () => {
    const sut = makeSut();
    const requestDate = sut.requestDate.toLocaleDateString('en-US');
    const expectedRequestDate = new Date().toLocaleDateString('en-US');
    expect(requestDate).toBe(expectedRequestDate);
  });

  it('Should create a new maitenance request with the status pending', () => {
    const { requestStatus } = makeSut();
    expect(requestStatus).toBe(RequestStatusEnum.Pending);
  });

  it('Should validate the subsidiary', () => {
    sutMock.subsidiaryIdentifier = null;
    const expectedMessage = 'Invalid subsidiary identifier';
    expect(() => makeSut()).toThrow(expectedMessage);
  });

  it('Should cancel the maintenace request', () => {
    const sut = makeSut();
    sut.cancel();
    expect(sut.requestStatus).toBe(RequestStatusEnum.Canceled);
  });
});
