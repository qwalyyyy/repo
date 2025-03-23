/**
 * SendTelegramResponseAction:
 * Этот класс формирует ответ для пользователя, используя DTO TelegramResponseDto,
 * и отправляет сообщение через Telegram.
 */
import { TelegramResponseDto } from "../dto/telegram-response.dto";

export class SendTelegramResponseAction {
  async execute(response: TelegramResponseDto): Promise<void> {
    /**
     * @todo
     */
  }
}
