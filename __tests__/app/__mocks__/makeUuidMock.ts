import { UuidAdapter } from '@infra/adapters/UuidAdapter';

const makeUuidMock = () => {
  const uuidAdapter = new UuidAdapter();
  uuidAdapter.generateUuid = jest.fn().mockReturnValue('any_uuid');
  return { uuidAdapter };
};

export { makeUuidMock };
