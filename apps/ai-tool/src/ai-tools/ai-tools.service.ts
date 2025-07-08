import { Injectable } from '@nestjs/common';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { UpdateAiToolDto } from './dto/update-ai-tool.dto';
import { Ollama } from 'ollama';

@Injectable()
export class AiToolsService {
  private ollama: Ollama;

  constructor() {
    // Inicializar cliente de Ollama (por defecto en localhost:11434)
    this.ollama = new Ollama({
      host: process.env.OLLAMA_HOST || 'http://localhost:11434',
    });
  }

  async create(createAiToolDto: CreateAiToolDto) {
    try {
      const { prompt, model = 'phi:2.7b', temperature = 0.7, maxTokens = 100 } = createAiToolDto;

      // Generar respuesta usando Ollama
      const response = await this.ollama.generate({
        model,
        prompt,
        options: {
          temperature,
          num_predict: maxTokens,
        },
      });

      return {
        success: true,
        data: {
          prompt,
          response: response.response,
          model,
          usage: {
            promptTokens: prompt.length,
            completionTokens: response.response.length,
            totalTokens: prompt.length + response.response.length,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: 'Error al generar respuesta con Ollama',
      };
    }
  }

  async generateText(prompt: string, model: string = 'phi:2.7b') {
    try {
      const response = await this.ollama.generate({
        model,
        prompt,
        options: {
          temperature: 0.7,
          num_predict: 100,
        },
      });

      return {
        success: true,
        text: response.response,
        model,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async analyzeSentiment(text: string) {
    try {
      const prompt = `Analiza el sentimiento del siguiente texto y responde solo con "positivo", "negativo" o "neutral": ${text}`;
      
      const response = await this.ollama.generate({
        model: 'phi:2.7b',
        prompt,
        options: {
          temperature: 0.3,
          num_predict: 10,
        },
      });

      return {
        success: true,
        sentiment: response.response.trim().toLowerCase(),
        text,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getAvailableModels() {
    try {
      const models = await this.ollama.list();
      return {
        success: true,
        models: models.models.map(model => ({
          name: model.name,
          size: model.size,
          modifiedAt: model.modified_at,
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
