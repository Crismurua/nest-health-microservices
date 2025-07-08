import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AiToolsService } from './ai-tools.service';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { UpdateAiToolDto } from './dto/update-ai-tool.dto';

@Controller()
export class AiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @MessagePattern('ai-tools.create')
  create(@Payload() createAiToolDto: CreateAiToolDto) {
    return this.aiToolsService.create(createAiToolDto);
  }

  @MessagePattern('ai-tools.generate')
  generateText(@Payload() data: { prompt: string; model?: string }) {
    return this.aiToolsService.generateText(data.prompt, data.model);
  }

  @MessagePattern('ai-tools.analyze-sentiment')
  analyzeSentiment(@Payload() data: { text: string }) {
    return this.aiToolsService.analyzeSentiment(data.text);
  }

  @MessagePattern('ai-tools.models')
  getAvailableModels() {
    return this.aiToolsService.getAvailableModels();
  }
}
