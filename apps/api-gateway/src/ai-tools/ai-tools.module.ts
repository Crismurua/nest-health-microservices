import { Module } from '@nestjs/common';
import { AiToolsService } from './ai-tools.service';
import { AiToolsController } from './ai-tools.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'AI_TOOLS_SERVICE',
      transport: Transport.TCP,
      options: {
        port: 4003,
      },
    },
  ])],
  controllers: [AiToolsController],
  providers: [AiToolsService],
})
export class AiToolsModule {}
