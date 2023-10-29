import { ISubsidiaryRepository } from '@app/subsidiaries/ISubsidiaryRepository';
import { Subsidiary } from '@domain/subsidiaries/Subsidiary';

const makeSubsidiaryRepositoryMock = (subsidiary: Subsidiary) => {
  const subsidiaryRepositoryMock = {
    searchById: jest.fn().mockReturnValue(Promise.resolve(subsidiary)),
  } as unknown as ISubsidiaryRepository;

  return { subsidiaryRepositoryMock };
};

export { makeSubsidiaryRepositoryMock };
