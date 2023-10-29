import { IUuidAdapter } from '@domain/IUuidAdapter';

const makeUuidAdapterMock = () => {
  const uuidAdapterMock = {
    generateUuid: jest.fn().mockReturnValue('any_uuid'),
  } as unknown as IUuidAdapter;

  return { uuidAdapterMock };
};

export { makeUuidAdapterMock };
