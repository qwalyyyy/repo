/**
 * CreateChatGPTRequestAction:
 * Формирует запрос к ChatGPT (OpenRouter), используя данные из Telegram и JSON-дамп CRM.
 * Использует DTO ChatGPTRequestDto для формирования запроса.
 */
import { ChatGPTRequestDto } from "../dto/ChatGPTRequestDto";

export class CreateChatGPTRequestAction {
  async execute(request: ChatGPTRequestDto): Promise<any> {
    /**
     * 1. Сформировать объект запроса к ChatGPT, используя DTO ChatGPTRequestDto.
     * 2. Заполнить поля запроса данными из inputText и crmDumpJson.
     * 3. Преобразовать объект в JSON-строку для отправки в OpenRouter.
     * 4. Отправить запрос в OpenRouter и получить ответ.
     * 5. Вернуть ответ в формате JSON.
     */
  }
}
