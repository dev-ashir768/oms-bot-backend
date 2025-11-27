import { ChatService } from "@/services/chat.service";
import { catchAsync } from "@/utils/catchAsync.util";
import { ResponseUtil } from "@/utils/response.util";
import { ChatValidationType } from "@/validations/chat.validation";
import { Request, Response } from "express";

class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  chat = catchAsync(async (req: Request, res: Response) => {
    const data: ChatValidationType = req.body;
    const response = await this.chatService.processQuestion(data.question);
    ResponseUtil.success(res, response, "Answer generated successfully");
  });
}

export default new ChatController();
