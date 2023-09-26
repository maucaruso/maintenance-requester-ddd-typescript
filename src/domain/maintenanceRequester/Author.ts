import { DomainException } from '@domain/DomainException';
import { isNotANumber } from '@helpers/isNotANumber';
import { isNullOrEmpty } from '@helpers/isNullOrEmpty';

class Author {
  public readonly identifier: number;
  public readonly name: string;

  constructor(identifier: number, name: string) {
    DomainException.throwsWhen(
      isNotANumber(identifier),
      'Invalid requester identifier'
    );

    DomainException.throwsWhen(isNullOrEmpty(name), 'Invalid requester name');

    this.identifier = identifier;
    this.name = name;
  }
}

export { Author };
