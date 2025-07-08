import { NestFactory } from '@nestjs/core';
import { AiToolAppModule } from './ai-tool-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AiToolAppModule, {
    transport: Transport.TCP,
    options: {
      port: 4003,
    },
  });
  await app.listen();
}
bootstrap();
