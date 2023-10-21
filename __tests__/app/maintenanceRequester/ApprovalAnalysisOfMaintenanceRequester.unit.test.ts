/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ApprovalAnalysisDto } from '@app/maintenanceRequester/ApprovalAnalysisDto';
import { ApprovalAnalysisOfMaintenanceRequester } from '@app/maintenanceRequester/ApprovalAnalysisOfMaintenanceRequester';
import { IMaintenanceRequesterRepository } from '@app/maintenanceRequester/IMaintenanceRequesterRepository';
import { MaintenanceRequester } from '@domain/maintenanceRequester/MaintenanceRequester';
import { MaintenanceRequestTypeEnum } from '@domain/maintenanceRequester/MaintenanceRequestTypeEnum';
import { RequestStatusEnum } from '@domain/maintenanceRequester/RequestStatusEnum';

jest.mock('@domain/maintenanceRequester/MaintenanceRequester');

const makeMaintenanceRequesterMock = (dto: ApprovalAnalysisDto) => {
  const mockedPendingMaintenanceRequest =
    new MaintenanceRequester() as jest.Mocked<MaintenanceRequester>;

  mockedPendingMaintenanceRequest.requestStatus = RequestStatusEnum.Pending;

  mockedPendingMaintenanceRequest.id = dto.requestIdentifier;

  mockedPendingMaintenanceRequest.approve.mockImplementation(() => {
    mockedPendingMaintenanceRequest.requestStatus = RequestStatusEnum.Approved;
  });

  mockedPendingMaintenanceRequest.disapprove.mockImplementation(() => {
    mockedPendingMaintenanceRequest.requestStatus =
      RequestStatusEnum.Disapproved;
  });

  return mockedPendingMaintenanceRequest;
};

const makeMaintenanceRequesterRepositoryMock = (
  maintenanceRequesterMock: MaintenanceRequester[]
) => {
  console.log('maintenanceRequesterMock----', maintenanceRequesterMock);

  class MaintenanceRequesterRepository
    implements IMaintenanceRequesterRepository
  {
    async search(): Promise<MaintenanceRequester[]> {
      throw new Error('Not implemented');
    }
    async searchById(id: string): Promise<MaintenanceRequester> {
      return maintenanceRequesterMock.find(
        (maintenanceRequest) => maintenanceRequest.id === id
      );
    }
    async add(entity: MaintenanceRequester): Promise<void> {
      throw new Error('Not implemented');
    }
    async getPendingsByType(
      maintenanceRequestType: MaintenanceRequestTypeEnum,
      subsidiaryIdentifier: string
    ): Promise<MaintenanceRequester[]> {
      throw new Error('Not implemented');
    }
    async getPendingsFrom(
      requesterIdentifier: string
    ): Promise<MaintenanceRequester[]> {
      throw new Error('Not implemented');
    }
  }

  return new MaintenanceRequesterRepository();
};

const makeNotifyDisapprovalToRequesterMock = () => {
  class NotifyDisapprovalToRequester implements INotifyDisapprovalToRequester {
    async notify() {
      // console.log('not implemented');
    }
  }

  return new NotifyDisapprovalToRequester();
};

const makeNotifyServiceContextMock = () => {
  class NotifyServiceContext implements INotifyServiceContext {
    async notify() {
      throw new Error('Not implemented');
    }
  }

  return new NotifyServiceContext();
};

const makeSut = (maintenanceRequesterMock: MaintenanceRequester[]) => {
  const mockedMaintenanceRequesterRepository =
    makeMaintenanceRequesterRepositoryMock(maintenanceRequesterMock);

  const mockedNotifyDisapprovalToRequester =
    makeNotifyDisapprovalToRequesterMock();

  const mockedNotifyServiceContext = makeNotifyServiceContextMock();

  const sut = new ApprovalAnalysisOfMaintenanceRequester(
    mockedMaintenanceRequesterRepository,
    mockedNotifyDisapprovalToRequester,
    mockedNotifyServiceContext
  );

  return { sut };
};

describe('Approval Analysis Of Maintenance Requester', () => {
  it('Should disapprove the maintenance request', async () => {
    const dto = Object.assign(new ApprovalAnalysisDto(), {
      approverIdentifier: 1,
      approverName: 'Mario',
      requestIdentifier: 'XPTO',
    });

    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];

    const { sut } = makeSut(maintenanceRequestMock);

    await sut.analyze(dto);

    expect(maintenanceRequestMock[0].requestStatus).toBe(
      RequestStatusEnum.Disapproved
    );
  });

  // it('Should validate the maintenance request to be analysed', () => {});

  // it('Should validate the maintenance request when it was already disapproved', () => {});

  // it('Should validate the maintenance request when it was already approved', () => {});

  // it('Should notify the requester about the dissaproval', () => {});

  // it('Should approve the maintenance request', () => {});

  // it('Should not notify the requester when approved', () => {});

  // it('Should notify the service context when the maintenance request is approved', () => {});

  // it('Should not notify the service context when the maintenance request is dissaproved', () => {});
});
