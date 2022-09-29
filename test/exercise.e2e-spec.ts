import mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/adapters/primaries/nestjs/app.module';
import { UserRepository } from '../src/domain/repositories/user.repository';
import { MongoUserRepository } from '../src/adapters/secondaries/user/mongo-user.repository';
import { ExerciseCreateDTO } from '../src/adapters/primaries/nestjs/exercise/exercise-create.dto';
import { ExerciseRepository } from '../src/domain/repositories';
import { MongoExerciseRepository } from '../src/adapters/secondaries/exercise/mongo-exercise.repository';

describe('Exercise Controller', () => {
  let app: INestApplication;
  let accessTokenUser1: string;
  let accessTokenUser2: string;
  let userRepository: UserRepository;
  let exerciseRepository: ExerciseRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userRepository = new MongoUserRepository();
    exerciseRepository = new MongoExerciseRepository();
    app = moduleFixture.createNestApplication();
    await mongoose.connect('mongodb://root:root@localhost:27018/admin');
    await app.init();

    await userRepository.add({
      id: '1',
      email: 'toto@gmail.com',
      password: '123',
    });
    await userRepository.add({
      id: '2',
      email: 'tata@gmail.com',
      password: '123',
    });

    // Auth user 1
    const authUser1: request.Response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'toto@gmail.com', password: '123' });
    accessTokenUser1 = authUser1.body.accessToken;

    // Auth user 2
    const auth: request.Response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'tata@gmail.com', password: '123' });
    accessTokenUser2 = auth.body.accessToken;
  });

  afterEach(async () => {
    await mongoose.connection.dropCollection('exercises');
  });

  afterAll(async () => {
    await mongoose.connection.dropCollection('users');
    await mongoose.disconnect();
  });

  it('should retrieve a list of exercises by user', async () => {
    // POST exercise user 1
    const exerciseAddedUser1: request.Response = await request(
      app.getHttpServer(),
    )
      .post('/exercises')
      .send({ name: 'Squat' } as ExerciseCreateDTO)
      .set({ Authorization: `Bearer ${accessTokenUser1}` });
    expect(exerciseAddedUser1.body).toEqual({
      id: exerciseAddedUser1.body.id,
      name: 'Squat',
      userId: '1',
    });
    expect(exerciseAddedUser1.statusCode).toEqual(201);

    // GET exercises user 1
    const exercisesUser1: request.Response = await request(app.getHttpServer())
      .get('/exercises')
      .set({ Authorization: `Bearer ${accessTokenUser1}` });
    expect(exercisesUser1.body).toEqual([
      { id: expect.any(String), name: 'Squat', userId: '1' },
    ]);
    expect(exercisesUser1.statusCode).toEqual(200);

    // POST exercise user 2
    const exerciseAddedUser2: request.Response = await request(
      app.getHttpServer(),
    )
      .post('/exercises')
      .send({ name: 'Bench' } as ExerciseCreateDTO)
      .set({ Authorization: `Bearer ${accessTokenUser2}` });
    expect(exerciseAddedUser2.body).toEqual({
      id: expect.any(String),
      name: 'Bench',
      userId: '2',
    });
    expect(exerciseAddedUser2.statusCode).toEqual(201);

    // GET exercises user 2
    const exercisesUser2: request.Response = await request(app.getHttpServer())
      .get('/exercises')
      .set({ Authorization: `Bearer ${accessTokenUser2}` });
    expect(exercisesUser2.body).toEqual([
      {
        id: expect.any(String),
        name: 'Bench',
        userId: '2',
      },
    ]);
    expect(exercisesUser2.statusCode).toEqual(200);
  });

  it('should update a user exercise', async () => {
    await exerciseRepository.create({ id: '1', name: 'Bench', userId: '1' });
    const updatedExercise: request.Response = await request(app.getHttpServer())
      .patch('/exercises/1')
      .send({ name: 'Bench 2 CT' })
      .set({ Authorization: `Bearer ${accessTokenUser1}` });
    expect(updatedExercise.body).toEqual({
      id: expect.any(String),
      name: 'Bench 2 CT',
      userId: '1',
    });
    expect(updatedExercise.statusCode).toEqual(200);
  });

  it('should delete a user exercise', async () => {
    await exerciseRepository.create({ id: '1', name: 'Bench', userId: '1' });
    const updatedExercise: request.Response = await request(app.getHttpServer())
      .delete('/exercises/1')
      .set({ Authorization: `Bearer ${accessTokenUser1}` });
    expect(updatedExercise.body).toEqual({
      id: expect.any(String),
      name: 'Bench',
      userId: '1',
    });
    expect(updatedExercise.statusCode).toEqual(200);
  });
});
