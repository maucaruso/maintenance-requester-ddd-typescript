/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { MaintenanceRequesterDto } from '@app/maintenanceRequester/MaintenanceRequesterDto';
import { Subsidiary } from '@domain/subsidiaries/Subsidiary';

jest.mock('@domain/subsidiaries/Subsidiary');

const makeSubsidiary = (maintenanceRequestDto: MaintenanceRequesterDto) => {
  const mockedSubsidiary = new Subsidiary() as jest.Mocked<Subsidiary>;
  mockedSubsidiary.id = maintenanceRequestDto.subsidiaryIdentifier;

  return { mockedSubsidiary };
};

export { makeSubsidiary };
