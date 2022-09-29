import { v4 as uuidv4 } from 'uuid';
import { IdProvider } from '../../domain/providers/id.provider';

export class RealIdProvider implements IdProvider {
  generate(): string {
    return uuidv4();
  }
}
