export class ConflictException extends Error {
  constructor(message: string) {
    super('[ConflictException] ' + message);
  }
}
