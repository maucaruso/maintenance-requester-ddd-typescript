import { Subsidiary } from '@domain/subsidiaries/Subsidiary';
import { UuidAdapter } from '@infra/adapters/UuidAdapter';

const makeUuidSpy = () => {
  const uuidAdapter = new UuidAdapter();
  uuidAdapter.generateUuid = jest.fn().mockReturnValue('any_uuid');
  return uuidAdapter;
};

describe('Subsidiary Entity Test', () => {
  it('Should register a with the correct name', () => {
    const sut = new Subsidiary(makeUuidSpy(), 'valid_name');
    expect(sut).toHaveProperty('name');
  });

  it('Should throws when a name was not specified', () => {
    expect(() => new Subsidiary(makeUuidSpy(), '')).toThrow(
      'Domain Exception: Invalid Subsidiary name'
    );
  });
});
