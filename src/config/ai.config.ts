import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { config } from "./environment.config";

class AIConfig {
  static chatModel = new ChatGoogleGenerativeAI({
    model: config.ai.geminiAiModel,
    apiKey: config.ai.googleApiKey,
    maxOutputTokens: 2048,
    temperature: 0.7,
  });

  static embeddingModel = new GoogleGenerativeAIEmbeddings({
    modelName: config.ai.embeddingModel,
    apiKey: config.ai.googleApiKey,
  });
}

export default AIConfig;
