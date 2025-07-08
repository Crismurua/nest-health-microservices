import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiToolsService } from './ai-tools.service';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';

@Controller('ai-tools')
export class AiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @Post()
  create(@Body() createAiToolDto: CreateAiToolDto) {
    return this.aiToolsService.create(createAiToolDto);
  }

  @Post('generate')
  generateText(@Body() data: { prompt: string; model?: string }) {
    return this.aiToolsService.generateText(data.prompt, data.model);
  }

  @Post('analyze-sentiment')
  analyzeSentiment(@Body() data: { text: string }) {
    return this.aiToolsService.analyzeSentiment(data.text);
  }

  @Get('models')
  getAvailableModels() {
    return this.aiToolsService.getAvailableModels();
  }
}
