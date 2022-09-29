export class NotFoundException extends Error {
  constructor(message: string) {
    super('[NotFoundException] ' + message);
  }
}
