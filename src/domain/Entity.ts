import { IUuidAdapter } from '@domain/IUuidAdapter';

abstract class Entity {
  private readonly id: string;

  constructor(uuid: IUuidAdapter) {
    if (!this.id) {
      this.id = uuid.generateUuid();
    }
  }

  entityId() {
    return this.id;
  }
}

export { Entity };
