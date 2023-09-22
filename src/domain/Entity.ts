import { IUuidAdapter } from '@domain/IUuidAdapter';

abstract class Entity {
  public readonly id: string;

  constructor(uuid: IUuidAdapter) {
    if (!this.id) {
      this.id = uuid.generateUuid();
    }
  }
}

export { Entity };
