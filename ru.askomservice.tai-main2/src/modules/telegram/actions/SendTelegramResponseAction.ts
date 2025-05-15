import { TelegramResponseDto } from "../dto/telegram-response.dto";
import fetch from "node-fetch";
import { trackEvent } from "../../../pages/api/analytics"; // путь подкорректируй под свой проект

export class SendTelegramResponseAction {
  private botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;

  async execute(response: TelegramResponseDto): Promise<void> {
    if (!this.botToken) {
      throw new Error("нет Telegram bot token");
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const payload = {
      chat_id: response.chatId,
      text: response.text,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // 📈 Трекинг ошибки отправки
      trackEvent(response.chatId, "telegram_send_error", {
        error: `HTTP ${res.status}`,
        text: response.text,
      });

      throw new Error("сообщение не может быть отправлено");
    }

    // 📈 Успешная отправка сообщения
    trackEvent(response.chatId, "telegram_message_sent", {
      text: response.text,
    });
  }
}
