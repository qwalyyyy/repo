import { TelegramMessageDto } from "../dto/telegram-message.dto";
import { SendTelegramResponseAction } from "./SendTelegramResponseAction";
import { CreateChatGPTRequestAction } from "../../openrouter/actions/CreateChatGPTRequestAction";
import { ProcessChatGPTResponseAction } from "../../openrouter/actions/ProcessChatGPTResponseAction";

import { initPostHog, identifyUser, trackEvent } from "../../../pages/api/analytics"; 

export class ProcessTelegramMessageAction {
  private whitelist = new Set([7661449859]);

  async execute(message: any): Promise<TelegramMessageDto> {
    initPostHog();

    const telegramMessageDto: TelegramMessageDto = {
      messageId: message.message_id,
      chatId: message.chat.id,
      from: {
        id: message.from.id,
        firstName: message.from.first_name,
        lastName: message.from.last_name,
        username: message.from.username,
      },
      text: message.text,
      date: new Date(message.date * 1000),
    };

    // 📈 Идентификация и трекинг входящего сообщения
    identifyUser(telegramMessageDto.from.id, {
      username: telegramMessageDto.from.username,
      firstName: telegramMessageDto.from.firstName,
      lastName: telegramMessageDto.from.lastName,
    });

    trackEvent(telegramMessageDto.from.id, "telegram_message_received", {
      text: telegramMessageDto.text,
    });

    const chatGptRequest = {
      originalText: telegramMessageDto.text,
      crmDump: JSON.stringify(this.getCrmDump()),
    };

    try {
      const createChatGPTRequestAction = new CreateChatGPTRequestAction();
      const chatGptResponse = await createChatGPTRequestAction.execute(chatGptRequest);

      const processChatGPTResponseAction = new ProcessChatGPTResponseAction();
      const processedResponse = await processChatGPTResponseAction.execute(chatGptResponse);

      const responseDto = {
        chatId: telegramMessageDto.chatId,
        text: `📊 Результаты анализа:\n\n🏷 Средняя цена за м²: ${processedResponse.averagePricePerSquareMeter.toLocaleString('ru-RU')} руб.\n🏠 Количество объектов: ${processedResponse.dealCount}`,
        parse_mode: 'Markdown',
      };

      const sendTelegramAction = new SendTelegramResponseAction();
      await sendTelegramAction.execute(responseDto);

      // 📈 Успешный ответ от GPT
      trackEvent(telegramMessageDto.from.id, "gpt_response_sent", {
        averagePrice: processedResponse.averagePricePerSquareMeter,
        dealCount: processedResponse.dealCount,
      });
    } catch (error) {
      console.error("⚠️ Ошибка при обработке запроса ChatGPT:", error);

      const responseDto = {
        chatId: telegramMessageDto.chatId,
        text: "⚠️ Произошла ошибка при обработке запроса. Пожалуйста, попробуйте чуть позже 🙏",
      };

      const sendTelegramAction = new SendTelegramResponseAction();
      await sendTelegramAction.execute(responseDto);

      // 📈 Ошибка при GPT-ответе
      trackEvent(telegramMessageDto.from.id, "gpt_response_error", {
        error: (error as Error).message,
      });
    }

    return telegramMessageDto;
  }

  private getCrmDump() {
    return [
      { price_per_sq_meter: 50000 },
      { price_per_sq_meter: 55000 },
      { price_per_sq_meter: 60000 },
    ];
  }
}