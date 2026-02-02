import AIService from "@/services/ai.service";
import { AppError } from "@/middleware/error.middleware";

export class ChatService {
  async processQuestion(question: string) {
    if (!question) throw new AppError("Question is required", 400);

    const aiAnswer = await AIService.generateAnswer(question);

    return {
      question,
      answer: aiAnswer,
      source: "Vector Search (One-Time Load)",
    };
  }
}
