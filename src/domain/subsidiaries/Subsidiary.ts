import { DomainException } from '@domain/DomainException';
import { Entity } from '@domain/Entity';
import { IUuidAdapter } from '@domain/IUuidAdapter';
import { isNullOrEmpty } from '@helpers/isNullOrEmpty';

class Subsidiary extends Entity {
  private readonly name: string;

  constructor(uuid: IUuidAdapter, name: string) {
    super(uuid);

    DomainException.throwsWhen(isNullOrEmpty(name), 'Invalid Subsidiary name');

    this.name = name;
  }

  subsidiaryName() {
    return this.name;
  }
}

export { Subsidiary };
