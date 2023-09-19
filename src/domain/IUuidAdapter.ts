interface IUuidAdapter {
  generateUuid(): string;
  validateUuid(uuid: string): boolean;
}

export type { IUuidAdapter };
