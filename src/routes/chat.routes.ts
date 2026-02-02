import { validateMiddleware } from '@/middleware/validate.middleware';
import { Router } from 'express';
import { chatValidation } from '@/validations/chat.validation';
import ChatController from '@/controllers/chat.controller';

const router = Router();

router.post("/chat", validateMiddleware(chatValidation), ChatController.chat)

export default router;