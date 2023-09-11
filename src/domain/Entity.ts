import { IUuidAdapter } from '@shared/interfaces/IUuidAdapter';

abstract class Entity {
  id: string;

  constructor(uuid: IUuidAdapter) {
    if (this.id) {
      return;
    }

    this.id = uuid.generateUuid();
  }
}

export { Entity };
