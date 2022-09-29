import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

const bootstrap = async () => {
  mongoose
    .connect('mongodb://root:root@localhost:27018/admin')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log(error);
    });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
};
bootstrap().catch((error) =>
  console.log('An error happened when launching the application: ', error),
);
