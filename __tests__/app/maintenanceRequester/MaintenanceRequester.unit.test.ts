/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { IMaintenanceRequesterRepository } from '@app/maintenanceRequester/IMaintenanceRequesterRepository';
import { MaintenanceRequester as MaintenanceRequesterApp } from '@app/maintenanceRequester/MaintenanceRequester';
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { MaintenanceRequesterFactory } from '@app/maintenanceRequester/MaintenanceRequesterFactory';
import { ICancelPendingMaintenanceRequester } from '@domain/maintenanceRequester/ICancelPendingMaintenanceRequester';
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';

import { makeMaintenanceRequestDtoMock } from '../__mocks__/makeMaintenanceRequestDtoMock';

const makeMaintenanceRequestRepositoryMock = () => {
  const maintenanceRequestRepositoryMock = {
    add: jest.fn().mockReturnValue(Promise.resolve()),
    getPendingsByType: jest.fn().mockReturnValue(Promise.resolve([])),
  } as unknown as IMaintenanceRequesterRepository;

  return { maintenanceRequestRepositoryMock };
};

const makeCancelPendingMaintenanceRequesterMock = () => {
  const cancelPendingMaintenanceRequesterMock = {
    cancel: jest.fn().mockReturnValue(Promise.resolve()),
  } as unknown as ICancelPendingMaintenanceRequester;

  return { cancelPendingMaintenanceRequesterMock };
};

const makeMaintenanceRequestMock = (
  maintenanceRequestDto: MaintenanceRequesterDto
) => {
  const maintenanceRequestMock = {} as jest.Mocked<MaintenanceRequester>;
  maintenanceRequestMock.subsidiaryIdentifier =
    maintenanceRequestDto.subsidiaryIdentifier;

  return { maintenanceRequestMock };
};

const makeMaintenanceRequesterFactoryMock = (
  maintenanceRequester: MaintenanceRequester
) => {
  const maintenanceRequesterFactoryMock = {
    make: jest.fn().mockReturnValue(Promise.resolve(maintenanceRequester)),
  } as unknown as MaintenanceRequesterFactory;

  return { maintenanceRequesterFactoryMock };
};

const makeSut = (
  maintenanceRequestDtoMock: MaintenanceRequesterDto,
  maintenanceRequestRepositoryMock: IMaintenanceRequesterRepository,
  {
    cancelPendingMaintenanceRequesterMock,
  } = makeCancelPendingMaintenanceRequesterMock()
) => {
  const { maintenanceRequestMock } = makeMaintenanceRequestMock(
    maintenanceRequestDtoMock
  );
  const { maintenanceRequesterFactoryMock } =
    makeMaintenanceRequesterFactoryMock(maintenanceRequestMock);

  const sut = new MaintenanceRequesterApp(
    maintenanceRequestRepositoryMock,
    maintenanceRequesterFactoryMock,
    cancelPendingMaintenanceRequesterMock
  );

  return { sut };
};

describe('Maintenance Requester Test', () => {
  it('Should save the maintenance request', async () => {
    const { maintenanceRequestDtoMock } = makeMaintenanceRequestDtoMock();
    const { maintenanceRequestRepositoryMock } =
      makeMaintenanceRequestRepositoryMock();

    const { sut } = makeSut(
      maintenanceRequestDtoMock,
      maintenanceRequestRepositoryMock
    );

    await sut.request(maintenanceRequestDtoMock);

    expect(maintenanceRequestRepositoryMock.add).toHaveBeenCalled();
  });

  it('Should cancel the pending maintenance request for the same request type', async () => {
    const { maintenanceRequestDtoMock } = makeMaintenanceRequestDtoMock();
    const { maintenanceRequestRepositoryMock } =
      makeMaintenanceRequestRepositoryMock();
    const { cancelPendingMaintenanceRequesterMock } =
      makeCancelPendingMaintenanceRequesterMock();

    const pendingMaintenanceRequests = [
      makeMaintenanceRequestMock(maintenanceRequestDtoMock),
    ];

    maintenanceRequestRepositoryMock.getPendingsByType = jest
      .fn()
      .mockResolvedValue(Promise.resolve(pendingMaintenanceRequests));

    const { sut } = makeSut(
      maintenanceRequestDtoMock,
      maintenanceRequestRepositoryMock,
      { cancelPendingMaintenanceRequesterMock }
    );

    await sut.request(maintenanceRequestDtoMock);

    expect(cancelPendingMaintenanceRequesterMock.cancel).toHaveBeenCalled();
    expect(cancelPendingMaintenanceRequesterMock.cancel).toHaveBeenCalledWith(
      pendingMaintenanceRequests
    );
  });
});
