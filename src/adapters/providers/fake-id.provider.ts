import { IdProvider } from '../../domain/providers/id.provider';

export class FakeIdProvider implements IdProvider {
  generate = (): string => {
    return '100';
  };
}
