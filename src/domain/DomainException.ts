class DomainException extends Error {
  constructor(paramName: string) {
    super(`Domain Exception: ${paramName}`);
    this.name = 'DomainException';
  }

  public static throwsWhen(invalidRule: boolean, message: string) {
    if (invalidRule) {
      throw new DomainException(message);
    }
  }
}

export { DomainException };
