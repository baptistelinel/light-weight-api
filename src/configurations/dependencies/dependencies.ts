import { inMemoryDependencies } from './in-memory-dependencies';
import { prodDependencies } from './prod-dependencies';

export const dependencies =
  process.env.NODE_ENV === 'production'
    ? prodDependencies
    : inMemoryDependencies;
