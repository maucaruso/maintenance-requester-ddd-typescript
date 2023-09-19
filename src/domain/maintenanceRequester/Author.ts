import { DomainException } from '@domain/DomainException';

class Author {
  private identifier: number;
  private name: string;

  constructor(identifier: number, name: string) {
    DomainException.throwsWhen(!name, 'Invalid requester name');

    this.identifier = identifier;
    this.name = name;
  }
}

export { Author };
