/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { CancelPendingMaintenanceRequester } from '@domain/maintenanceRequester/CancelPendingMaintenanceRequester';
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';
import { RequestStatusEnum } from '@domain/maintenanceRequester/RequestStatusEnum';

jest.mock('@domain/maintenanceRequester/MaintenanceRequester');

const makeMaintenanceRequesterMock = () => {
  const mockedPendingMaintenanceRequest =
    new MaintenanceRequester() as jest.Mocked<MaintenanceRequester>;

  mockedPendingMaintenanceRequest.requestStatus = RequestStatusEnum.Pending;

  mockedPendingMaintenanceRequest.cancel.mockImplementation(() => {
    mockedPendingMaintenanceRequest.requestStatus = RequestStatusEnum.Canceled;
  });

  return mockedPendingMaintenanceRequest;
};

describe('Cancel Pending Maintenance Requester Value Object', () => {
  it('Should cancel all pending maintenance requests', () => {
    const mockedPendingMaintenanceRequests = [
      makeMaintenanceRequesterMock(),
      makeMaintenanceRequesterMock(),
      makeMaintenanceRequesterMock(),
    ];

    const sut = new CancelPendingMaintenanceRequester();

    expect(mockedPendingMaintenanceRequests[0].requestStatus).toBe(
      RequestStatusEnum.Pending
    );
    expect(mockedPendingMaintenanceRequests[1].requestStatus).toBe(
      RequestStatusEnum.Pending
    );
    expect(mockedPendingMaintenanceRequests[2].requestStatus).toBe(
      RequestStatusEnum.Pending
    );

    sut.cancel(mockedPendingMaintenanceRequests);

    expect(mockedPendingMaintenanceRequests[0].requestStatus).toBe(
      RequestStatusEnum.Canceled
    );
    expect(mockedPendingMaintenanceRequests[1].requestStatus).toBe(
      RequestStatusEnum.Canceled
    );
    expect(mockedPendingMaintenanceRequests[2].requestStatus).toBe(
      RequestStatusEnum.Canceled
    );
  });

  it('Should not throw an exception when the maintenance request is null', () => {
    const sut = new CancelPendingMaintenanceRequester();
    expect(() => sut.cancel(null)).not.toThrow();
  });
});
