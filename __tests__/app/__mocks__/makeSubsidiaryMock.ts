/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { Subsidiary } from '@domain/subsidiaries/Subsidiary';

jest.mock('@domain/subsidiaries/Subsidiary');

const makeSubsidiaryMock = (maintenanceRequestDto: MaintenanceRequesterDto) => {
  const subsidiaryMock = new Subsidiary() as jest.Mocked<Subsidiary>;
  subsidiaryMock.id = maintenanceRequestDto.subsidiaryIdentifier;

  return { subsidiaryMock };
};

export { makeSubsidiaryMock };
