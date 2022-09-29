import { PartialType } from '@nestjs/mapped-types';
import { ExerciseCreateDTO } from './exercise-create.dto';

export class ExerciseUpdateDTO extends PartialType(ExerciseCreateDTO) {}
