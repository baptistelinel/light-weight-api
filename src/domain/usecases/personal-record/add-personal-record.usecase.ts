import { ExerciseRepository } from '../../../domain/repositories';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { ExerciseDone, Training } from '../../../domain/models';
import { PersonalRecord } from '../../../domain/models/personal-record.model';
import { DateProvider } from '../../../domain/providers/date.provider';
import { IdProvider } from '../../../domain/providers/id.provider';
import { PersonalRecordRepository } from '../../repositories/personal-record.repository';

export class AddPersonalRecord {
  constructor(
    private readonly personalRecordRepository: PersonalRecordRepository,
    private readonly exerciseRepository: ExerciseRepository,
    private readonly dateProvider: DateProvider,
    private readonly idProvider: IdProvider,
  ) {}

  handle = async (training: Training): Promise<PersonalRecord[] | void> => {
    const exerciseNames = new Set(
      ...[training.exercises.map((exercise) => exercise.name)],
    );
    const groupedExercises: ExerciseDone[][] = [...exerciseNames].map(
      (exerciseName) =>
        training.exercises.filter((exercise) => exercise.name === exerciseName),
    );
    const exercisesWithMaxWeight: ExerciseDone[] = groupedExercises.map(
      (groupedExercise) =>
        groupedExercise.reduce((prev, current) =>
          prev.weight > current.weight ? prev : current,
        ),
    );
    return Promise.all(
      exercisesWithMaxWeight.map(async (exerciseWithMaxWeight) => {
        const exercise = await this.exerciseRepository.retrieveOneByName(
          exerciseWithMaxWeight.name,
        );
        if (null === exercise) {
          throw new NotFoundException(
            `Error: exercise, ${exerciseWithMaxWeight.name} does not exist`,
          );
        }
        const personalRecordByExercise =
          await this.personalRecordRepository.retrieveByExercise(
            exerciseWithMaxWeight,
          );
        if (
          null === personalRecordByExercise ||
          exerciseWithMaxWeight.weight >
            personalRecordByExercise.exercise.weight
        ) {
          const id = this.idProvider.generate();
          const date = this.dateProvider.getCurrent();
          return this.personalRecordRepository.addPersonalRecords({
            id,
            exercise: exerciseWithMaxWeight,
            date,
          });
        }
      }),
    );
  };
}
