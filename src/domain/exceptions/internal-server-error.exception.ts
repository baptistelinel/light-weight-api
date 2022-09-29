export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super('[InternalServerErrorException] ' + message);
  }
}
