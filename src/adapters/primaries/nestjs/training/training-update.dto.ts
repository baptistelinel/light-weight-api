import { PartialType } from '@nestjs/mapped-types';
import { TrainingCreateDTO } from './training-create.dto';

export class TrainingUpdateDTO extends PartialType(TrainingCreateDTO) {
  totalWeight?: number;
}
