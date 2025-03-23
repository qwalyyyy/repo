/**
 * ProcessTelegramMessageAction:
 * Этот класс отвечает за обработку входящих сообщений Telegram.
 * Он принимает данные из Telegram, проверяет доступ пользователя (whitelist),
 * а возвращает DTO TelegramMessageDto для дальнейшей обработки
 */
import { TelegramMessageDto } from "../dto/telegram-message.dto";

export class ProcessTelegramMessageAction {
  async execute(message: any): Promise<TelegramMessageDto> {
    /**
     * @todo
     * 1. Изучаем документацию Telegram API — узнаём, какие данные мы получаем при получении сообщения.
     * 2. Проверяем, есть ли пользователь в whitelist (черный список).
     * 3. Если пользователь не в whitelist, возвращаем ошибку или сообщение о запрете. (throw)
     * 4. Если пользователь в whitelist, преобразуем входящее сообщение в формат TelegramMessageDto.
     */

    // Пока нет реализации — возвращаем заглушку
    return {
      messageId: 123,
      chatId: 123,
      userId: 123,
      username: 'test_user',
      text: '1 комнатная квартира на Чуркине',
      date: new Date(message.date * 1000),
    };
  }
}
