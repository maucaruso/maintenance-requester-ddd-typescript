import { v4 as uuid, validate as uuidValidate } from 'uuid';

import { IUuidAdapter } from '@domain/IUuidAdapter';

class UuidAdapter implements IUuidAdapter {
  generateUuid(): string {
    return uuid();
  }

  validateUuid(uuid: string): boolean {
    return uuidValidate(uuid);
  }
}

export { UuidAdapter };
