import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envConf = dotenv.parse(fs.readFileSync('.env'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors();
  await app.listen(envConf['PORT']);
}
bootstrap();
