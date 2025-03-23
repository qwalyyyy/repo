/**
 * ProcessChatGPTResponseAction:
 * Обрабатывает ответ от ChatGPT, используя DTO ChatGPTResponseDto.
 * Извлекает расчетные данные из ответа и подготавливает их для дальнейшего использования.
 */
import { ChatGPTResponseDto } from "../dto/ChatGPTResponseDto";

export class ProcessChatGPTResponseAction {
  async execute(responseJson: any): Promise<ChatGPTResponseDto> {
    /**
     * 1. Извлекаем данные из JSON-ответа от ChatGPT.
     * 2. Преобразуем их в объект ChatGPTResponseDto.
     * 3. Возвращаем объект ChatGPTResponseDto.
     */
  }
}
