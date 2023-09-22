import { DomainException } from '@domain/DomainException';
import { Entity } from '@domain/Entity';
import { IUuidAdapter } from '@domain/IUuidAdapter';
import { isNullOrEmpty } from '@helpers/isNullOrEmpty';

class Subsidiary extends Entity {
  public readonly name: string;

  constructor(uuid: IUuidAdapter, name: string) {
    super(uuid);
    DomainException.throwsWhen(isNullOrEmpty(name), 'Invalid Subsidiary name');
    this.name = name;
  }
}

export { Subsidiary };
