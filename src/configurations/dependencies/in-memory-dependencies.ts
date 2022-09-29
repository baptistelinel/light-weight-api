import { Provider } from '@nestjs/common';
import { InMemoryTrainingRepository } from '../../adapters/secondaries/training/in-memory-training.repository';
import { InMemoryExerciseRepository } from '../../adapters/secondaries/exercise/in-memory-exercise.repository';
import { RetrieveExercisesByUserId } from '../../domain/usecases/exercise/retrieve-exercises-by-user-id.usecase';
import { RemoveExerciseById } from '../../domain/usecases/exercise/remove-exercise-by-id.usecase';
import { CreateExercise } from '../../domain/usecases/exercise/create-exercise.usecase';
import { UpdateExerciseById } from '../../domain/usecases/exercise/update-exercise-by-id.usecase';
import { CreateTraining } from '../../domain/usecases/training/create-training.usecase';
import { RemoveTrainingById } from '../../domain/usecases/training/remove-training-by-id.usecase';
import { UpdateTrainingById } from '../../domain/usecases/training/update-training-by-id.usecase';
import { FakeDateProvider } from '../../adapters/providers/fake-date.provider';
import { FakeIdProvider } from '../../adapters/providers/fake-id.provider';
import { RetrievePersonalRecords } from '../../domain/usecases/personal-record/retrieve-personal-records.usecase';
import { InMemoryPersonalRecordRepository } from '../../adapters/secondaries/personal-record/in-memory-personal-record.repository';
import { AddPersonalRecord } from '../../domain/usecases/personal-record/add-personal-record.usecase';
import { RetrieveUserByEmail } from '../../domain/usecases/user/retrieve-user-by-email.usecase';
import { InMemoryUserRepository } from '../../adapters/secondaries/user/in-memory-user.repository';
import { FakeAuthTokenProvider } from '../../adapters/providers/fake-auth-token.provider';
import { AuthenticateUser } from '../../domain/usecases/authentication/authenticate-user.usecase';
import { AddUser } from '../../domain/usecases/user/add-user.usecase';
import { RetrieveTrainingsByUserId } from '../../domain/usecases/training/retrieve-trainings-by-user-id.usecase';

const exerciseRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: InMemoryExerciseRepository,
  useValue: repository,
});

const retrieveExercisesUsecaseByUserId = {
  provide: RetrieveExercisesByUserId,
  useFactory: (repository: InMemoryExerciseRepository) =>
    new RetrieveExercisesByUserId(repository),
  inject: [InMemoryExerciseRepository],
};

const removeExerciseByIdUsecase = {
  provide: RemoveExerciseById,
  useFactory: (repository: InMemoryExerciseRepository) =>
    new RemoveExerciseById(repository),
  inject: [InMemoryExerciseRepository],
};

const createExerciseUsecase = {
  provide: CreateExercise,
  useFactory: (repository: InMemoryExerciseRepository) =>
    new CreateExercise(repository, new FakeIdProvider()),
  inject: [InMemoryExerciseRepository],
};

const updateExerciseByIdUsecase = {
  provide: UpdateExerciseById,
  useFactory: (repository: InMemoryExerciseRepository) =>
    new UpdateExerciseById(repository),
  inject: [InMemoryExerciseRepository],
};

const trainingRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: InMemoryTrainingRepository,
  useValue: repository,
});

const retrieveTrainingsByUserIdUsecase = {
  provide: RetrieveTrainingsByUserId,
  useFactory: (repository: InMemoryTrainingRepository) =>
    new RetrieveTrainingsByUserId(repository),
  inject: [InMemoryTrainingRepository],
};

const createTrainingUsecase = {
  provide: CreateTraining,
  useFactory: (repository: InMemoryTrainingRepository) =>
    new CreateTraining(
      repository,
      new FakeDateProvider(),
      new FakeIdProvider(),
    ),
  inject: [InMemoryTrainingRepository],
};

const removeTrainingByIdUsecase = {
  provide: RemoveTrainingById,
  useFactory: (repository: InMemoryTrainingRepository) =>
    new RemoveTrainingById(repository),
  inject: [InMemoryTrainingRepository],
};

const updateTrainingByIdUsecase = {
  provide: UpdateTrainingById,
  useFactory: (repository: InMemoryTrainingRepository) =>
    new UpdateTrainingById(repository),
  inject: [InMemoryTrainingRepository],
};

const personalRecordRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: InMemoryPersonalRecordRepository,
  useValue: repository,
});

const retrievePersonalRecordsUsecase = {
  provide: RetrievePersonalRecords,
  useFactory: (repository: InMemoryPersonalRecordRepository) =>
    new RetrievePersonalRecords(repository),
  inject: [InMemoryPersonalRecordRepository],
};

const addPersonalRecordUsecase = {
  provide: AddPersonalRecord,
  useFactory: (repository: InMemoryPersonalRecordRepository) =>
    new AddPersonalRecord(
      repository,
      new InMemoryExerciseRepository(),
      new FakeDateProvider(),
      new FakeIdProvider(),
    ),
  inject: [InMemoryPersonalRecordRepository],
};

const userRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: InMemoryUserRepository,
  useValue: repository,
});

const retrieveUserByEmailUsecase = {
  provide: RetrieveUserByEmail,
  useFactory: (repository: InMemoryUserRepository) =>
    new RetrieveUserByEmail(repository),
  inject: [InMemoryUserRepository],
};

const addUserUsecase = {
  provide: AddUser,
  useFactory: (repository: InMemoryUserRepository) =>
    new AddUser(repository, new FakeIdProvider()),
  inject: [InMemoryUserRepository],
};

const authenticateUserUsecase = {
  provide: AuthenticateUser,
  useFactory: (repository: InMemoryUserRepository) =>
    new AuthenticateUser(repository, new FakeAuthTokenProvider()),
  inject: [InMemoryUserRepository],
};

export const inMemoryDependencies = [
  exerciseRepositoryProvider(new InMemoryExerciseRepository()),
  retrieveExercisesUsecaseByUserId,
  removeExerciseByIdUsecase,
  createExerciseUsecase,
  updateExerciseByIdUsecase,
  trainingRepositoryProvider(new InMemoryTrainingRepository()),
  retrieveTrainingsByUserIdUsecase,
  createTrainingUsecase,
  removeTrainingByIdUsecase,
  updateTrainingByIdUsecase,
  personalRecordRepositoryProvider(new InMemoryPersonalRecordRepository()),
  retrievePersonalRecordsUsecase,
  addPersonalRecordUsecase,
  userRepositoryProvider(new InMemoryUserRepository()),
  retrieveUserByEmailUsecase,
  addUserUsecase,
  authenticateUserUsecase,
];
