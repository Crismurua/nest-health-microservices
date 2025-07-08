export class CreateAiToolDto {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}
