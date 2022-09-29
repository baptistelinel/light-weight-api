import { DateProvider } from '../../domain/providers/date.provider';

export class RealDateProvider implements DateProvider {
  getCurrent(): Date {
    return new Date();
  }
}
