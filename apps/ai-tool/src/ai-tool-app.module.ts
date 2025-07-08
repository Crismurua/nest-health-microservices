import { Module } from '@nestjs/common';
import { AiToolsModule } from './ai-tools/ai-tools.module';

@Module({
  imports: [AiToolsModule],
  controllers: [],
  providers: [],
})
export class AiToolAppModule {}
