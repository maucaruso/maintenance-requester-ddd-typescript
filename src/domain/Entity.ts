import { IUuidAdapter } from '@domain/IUuidAdapter';

abstract class Entity {
  id: string;

  constructor(uuid: IUuidAdapter) {
    if (!this.id) {
      this.id = uuid.generateUuid();
    }
  }
}

export { Entity };
