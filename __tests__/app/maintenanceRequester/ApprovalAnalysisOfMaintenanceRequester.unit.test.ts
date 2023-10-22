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

  mockedPendingMaintenanceRequest.disapproved.mockImplementation(() => {
    return (
      mockedPendingMaintenanceRequest.requestStatus ===
      RequestStatusEnum.Disapproved
    );
  });

  mockedPendingMaintenanceRequest.approved.mockImplementation(() => {
    return (
      mockedPendingMaintenanceRequest.requestStatus ===
      RequestStatusEnum.Approved
    );
  });

  return mockedPendingMaintenanceRequest;
};

const makeMaintenanceRequesterRepositoryMock = (
  maintenanceRequesterMock: MaintenanceRequester[]
) => {
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
      // console.log('not implemented');
    }
  }

  return new NotifyServiceContext();
};

const makeSut = (
  maintenanceRequesterMock: MaintenanceRequester[],
  mockedNotifyDisapprovalToRequester = makeNotifyDisapprovalToRequesterMock(),
  mockedNotifyServiceContext = makeNotifyServiceContextMock()
) => {
  const mockedMaintenanceRequesterRepository =
    makeMaintenanceRequesterRepositoryMock(maintenanceRequesterMock);

  const sut = new ApprovalAnalysisOfMaintenanceRequester(
    mockedMaintenanceRequesterRepository,
    mockedNotifyDisapprovalToRequester,
    mockedNotifyServiceContext
  );

  return { sut };
};

const makeDto = () => {
  const dto = Object.assign(new ApprovalAnalysisDto(), {
    approverIdentifier: 1,
    approverName: 'Mario',
    requestIdentifier: 'XPTO',
  });

  return { dto };
};

describe('Approval Analysis Of Maintenance Requester', () => {
  it('Should disapprove the maintenance request', async () => {
    const { dto } = makeDto();
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    const { sut } = makeSut(maintenanceRequestMock);

    await sut.analyze(dto);

    expect(maintenanceRequestMock[0].requestStatus).toBe(
      RequestStatusEnum.Disapproved
    );
  });

  it('Should validate the maintenance request to be analysed', async () => {
    const { dto } = makeDto();
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    const { sut } = makeSut(maintenanceRequestMock);
    const expectedMessage = 'Maintenence request not found';
    const invalidRequestIdentifier = 'WERT';

    expect(async () =>
      sut.analyze({
        ...dto,
        requestIdentifier: invalidRequestIdentifier,
      })
    ).rejects.toThrow(expectedMessage);
  });

  it('Should validate the maintenance request when it was already disapproved', async () => {
    const { dto } = makeDto();
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    maintenanceRequestMock[0].disapprove();
    const { sut } = makeSut(maintenanceRequestMock);
    const expectedMessage = 'This maintenance request was disapproved';

    expect(async () => sut.analyze(dto)).rejects.toThrow(expectedMessage);
  });

  it('Should validate the maintenance request when it was already approved', () => {
    const { dto } = makeDto();
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    maintenanceRequestMock[0].approve();
    const { sut } = makeSut(maintenanceRequestMock);
    const expectedMessage = 'This maintenance request was approved';

    expect(async () => sut.analyze(dto)).rejects.toThrow(expectedMessage);
  });

  it('Should notify the requester about the dissaproval', () => {
    const { dto } = makeDto();
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    maintenanceRequestMock[0].approve();
    const { sut } = makeSut(maintenanceRequestMock);
    const expectedMessage = 'This maintenance request was approved';

    expect(async () => sut.analyze(dto)).rejects.toThrow(expectedMessage);
  });

  it('Should approve the maintenance request', async () => {
    const { dto } = makeDto();
    dto.approved = true;
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    const { sut } = makeSut(maintenanceRequestMock);

    await sut.analyze(dto);

    expect(maintenanceRequestMock[0].requestStatus).toBe(
      RequestStatusEnum.Approved
    );
  });

  it('Should not notify the requester when approved', async () => {
    const { dto } = makeDto();
    dto.approved = true;
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    const mockedNotifyDisapprovalToRequester =
      makeNotifyDisapprovalToRequesterMock();
    const { sut } = makeSut(
      maintenanceRequestMock,
      mockedNotifyDisapprovalToRequester
    );

    const spy = jest.spyOn(mockedNotifyDisapprovalToRequester, 'notify');

    await sut.analyze(dto);

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should notify the service context when the maintenance request is approved', async () => {
    const { dto } = makeDto();
    dto.approved = true;
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    const mockedNotifyDisapprovalToRequester =
      makeNotifyDisapprovalToRequesterMock();
    const mockedNotifyServiceContext = makeNotifyServiceContextMock();
    const { sut } = makeSut(
      maintenanceRequestMock,
      mockedNotifyDisapprovalToRequester,
      mockedNotifyServiceContext
    );

    const spy = jest.spyOn(mockedNotifyServiceContext, 'notify');

    await sut.analyze(dto);

    expect(spy).toHaveBeenCalled();
  });

  it('Should not notify the service context when the maintenance request is dissaproved', async () => {
    const { dto } = makeDto();
    dto.approved = false;
    const maintenanceRequestMock = [makeMaintenanceRequesterMock(dto)];
    const mockedNotifyDisapprovalToRequester =
      makeNotifyDisapprovalToRequesterMock();
    const mockedNotifyServiceContext = makeNotifyServiceContextMock();
    const { sut } = makeSut(
      maintenanceRequestMock,
      mockedNotifyDisapprovalToRequester,
      mockedNotifyServiceContext
    );

    const spy = jest.spyOn(mockedNotifyServiceContext, 'notify');

    await sut.analyze(dto);

    expect(spy).not.toHaveBeenCalled();
  });
});
