class DomainException extends Error {
  constructor(paramName: string) {
    super(`Domain Exception: ${paramName}`);
    this.name = 'DomainException';
  }
}

export { DomainException };
