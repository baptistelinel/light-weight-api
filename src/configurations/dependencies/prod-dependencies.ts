import { Provider } from '@nestjs/common';
import { RemoveExerciseById } from '../../domain/usecases/exercise/remove-exercise-by-id.usecase';
import { UpdateExerciseById } from '../../domain/usecases/exercise/update-exercise-by-id.usecase';
import { RealIdProvider } from '../../adapters/providers/real-id.provider';
import { MongoExerciseRepository } from '../../adapters/secondaries/exercise/mongo-exercise.repository';
import { CreateExercise } from '../../domain/usecases/exercise/create-exercise.usecase';
import { MongoTrainingRepository } from '../../adapters/secondaries/training/mongo-training.repository';
import { RemoveTrainingById } from '../../domain/usecases/training/remove-training-by-id.usecase';
import { CreateTraining } from '../../domain/usecases/training/create-training.usecase';
import { RealDateProvider } from '../../adapters/providers/real-date.provider';
import { UpdateTrainingById } from '../../domain/usecases/training/update-training-by-id.usecase';
import { RetrievePersonalRecords } from '../../domain/usecases/personal-record/retrieve-personal-records.usecase';
import { MongoPersonalRecordRepository } from '../../adapters/secondaries/personal-record/mongo-personal-record.repository';
import { AddPersonalRecord } from '../../domain/usecases/personal-record/add-personal-record.usecase';
import { RetrieveUserByEmail } from '../../domain/usecases/user/retrieve-user-by-email.usecase';
import { MongoUserRepository } from '../../adapters/secondaries/user/mongo-user.repository';
import { AuthenticateUser } from '../../domain/usecases/authentication/authenticate-user.usecase';
import { JwtAuthTokenProvider } from '../../adapters/providers/jwt-auth-token.provider';
import { AddUser } from '../../domain/usecases/user/add-user.usecase';
import { RetrieveTrainingsByUserId } from '../../domain/usecases/training/retrieve-trainings-by-user-id.usecase';
import { RetrieveExercisesByUserId } from '../../domain/usecases/exercise/retrieve-exercises-by-user-id.usecase';
import { JwtService } from '@nestjs/jwt';

const exerciseRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: MongoExerciseRepository,
  useValue: repository,
});

const retrieveExercisesUsecaseByUserId = {
  provide: RetrieveExercisesByUserId,
  useFactory: (repository: MongoExerciseRepository) =>
    new RetrieveExercisesByUserId(repository),
  inject: [MongoExerciseRepository],
};

const removeExerciseByIdUsecase = {
  provide: RemoveExerciseById,
  useFactory: (repository: MongoExerciseRepository) =>
    new RemoveExerciseById(repository),
  inject: [MongoExerciseRepository],
};

const createExerciseUsecase = {
  provide: CreateExercise,
  useFactory: (repository: MongoExerciseRepository) =>
    new CreateExercise(repository, new RealIdProvider()),
  inject: [MongoExerciseRepository],
};

const updateExerciseByIdUsecase = {
  provide: UpdateExerciseById,
  useFactory: (repository: MongoExerciseRepository) =>
    new UpdateExerciseById(repository),
  inject: [MongoExerciseRepository],
};

const trainingRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: MongoTrainingRepository,
  useValue: repository,
});

const retrieveTrainingsByUserIdUsecase = {
  provide: RetrieveTrainingsByUserId,
  useFactory: (repository: MongoTrainingRepository) =>
    new RetrieveTrainingsByUserId(repository),
  inject: [MongoTrainingRepository],
};

const createTrainingUsecase = {
  provide: CreateTraining,
  useFactory: (repository: MongoTrainingRepository) =>
    new CreateTraining(
      repository,
      new RealDateProvider(),
      new RealIdProvider(),
    ),
  inject: [MongoTrainingRepository],
};

const removeTrainingByIdUsecase = {
  provide: RemoveTrainingById,
  useFactory: (repository: MongoTrainingRepository) =>
    new RemoveTrainingById(repository),
  inject: [MongoTrainingRepository],
};

const updateTrainingByIdUsecase = {
  provide: UpdateTrainingById,
  useFactory: (repository: MongoTrainingRepository) =>
    new UpdateTrainingById(repository),
  inject: [MongoTrainingRepository],
};

const personalRecordRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: MongoPersonalRecordRepository,
  useValue: repository,
});

const retrievePersonalRecordsUsecase = {
  provide: RetrievePersonalRecords,
  useFactory: (repository: MongoPersonalRecordRepository) =>
    new RetrievePersonalRecords(repository),
  inject: [MongoPersonalRecordRepository],
};

const addPersonalRecordUsecase = {
  provide: AddPersonalRecord,
  useFactory: (repository: MongoPersonalRecordRepository) =>
    new AddPersonalRecord(
      repository,
      new MongoExerciseRepository(),
      new RealDateProvider(),
      new RealIdProvider(),
    ),
  inject: [MongoPersonalRecordRepository],
};

const userRepositoryProvider = <T>(repository: T): Provider<T> => ({
  provide: MongoUserRepository,
  useValue: repository,
});

const retrieveUserByEmailUsecase = {
  provide: RetrieveUserByEmail,
  useFactory: (repository: MongoUserRepository) =>
    new RetrieveUserByEmail(repository),
  inject: [MongoUserRepository],
};

const addUserUsecase = {
  provide: AddUser,
  useFactory: (repository: MongoUserRepository) =>
    new AddUser(repository, new RealIdProvider()),
  inject: [MongoUserRepository],
};

const authenticateUserUsecase = {
  provide: AuthenticateUser,
  useFactory: (repository: MongoUserRepository) =>
    new AuthenticateUser(
      repository,
      new JwtAuthTokenProvider(new JwtService()),
    ),
  inject: [MongoUserRepository],
};

export const prodDependencies = [
  exerciseRepositoryProvider(new MongoExerciseRepository()),
  retrieveExercisesUsecaseByUserId,
  removeExerciseByIdUsecase,
  createExerciseUsecase,
  updateExerciseByIdUsecase,
  trainingRepositoryProvider(new MongoTrainingRepository()),
  retrieveTrainingsByUserIdUsecase,
  createTrainingUsecase,
  removeTrainingByIdUsecase,
  updateTrainingByIdUsecase,
  personalRecordRepositoryProvider(new MongoPersonalRecordRepository()),
  retrievePersonalRecordsUsecase,
  addPersonalRecordUsecase,
  userRepositoryProvider(new MongoUserRepository()),
  retrieveUserByEmailUsecase,
  addUserUsecase,
  authenticateUserUsecase,
];
