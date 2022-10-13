import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';
import { winstonConfig } from './config/ winston';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });

  await app.listen(PORT, () =>
    logger.log(`Application is running on port ${PORT}`),
  );
}
bootstrap();
