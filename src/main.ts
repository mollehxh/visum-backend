import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  try {
    await app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (error) {
    throw new Error(error);
  }
};
bootstrap();
