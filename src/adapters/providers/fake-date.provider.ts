import { DateProvider } from '../../domain/providers/date.provider';

export class FakeDateProvider implements DateProvider {
  getCurrent = (): Date => {
    return new Date('2022-06-03');
  };
}
