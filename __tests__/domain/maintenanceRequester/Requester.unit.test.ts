import { Author } from '@domain/maintenanceRequester/Author';

const identifier = 55;
const name = 'Henrique Almeida';

describe('Requester Value Object Test', () => {
  it('Should create a requester', () => {
    const expectedRequester = {
      identifier,
      name,
    };

    const requester = new Author(
      expectedRequester.identifier,
      expectedRequester.name
    );

    expect(requester).toEqual(expectedRequester);
  });

  test.each([
    ['name', ''],
    ['name', null],
  ])('Should validate the requester name', (_key, invalidName) => {
    const expectedMessage = 'Invalid requester name';

    expect(() => new Author(identifier, invalidName)).toThrow(expectedMessage);
  });
});
