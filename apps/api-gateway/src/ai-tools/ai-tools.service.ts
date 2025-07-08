import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AiToolsService {
  constructor(@Inject('AI_TOOLS_SERVICE') private aiToolsClient: ClientProxy) {}

  create(createAiToolDto: CreateAiToolDto) {
    return this.aiToolsClient.send('ai-tools.create', createAiToolDto);
  }

  generateText(prompt: string, model?: string) {
    return this.aiToolsClient.send('ai-tools.generate', { prompt, model });
  }

  analyzeSentiment(text: string) {
    return this.aiToolsClient.send('ai-tools.analyze-sentiment', { text });
  }

  getAvailableModels() {
    return this.aiToolsClient.send('ai-tools.models', {});
  }
}
