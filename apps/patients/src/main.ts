import { NestFactory } from '@nestjs/core';
import { PatientsModule } from './patients.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PatientsModule, {
    transport: Transport.TCP,
    options: {
      port: 4001,
    },
  });
  await app.listen();
}
bootstrap();
