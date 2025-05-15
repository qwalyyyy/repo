import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { ChatGPTRequestDto } from "../dto/ChatGPTRequestDto";

const openai = new OpenAI({
  baseURL: 'https://api.f5ai.ru/v1',
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
    'X-Auth-Token': process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  },
});

export class CreateChatGPTRequestAction {
  async execute(request: ChatGPTRequestDto): Promise<any> {
    try {
      // Чтение CRM-дампа из файла
      const crmDumpPath = path.join(process.cwd(), 'resources/crm_dump.json');
      const crmDumpRaw = fs.readFileSync(crmDumpPath, 'utf-8');
      const crmData = JSON.parse(crmDumpRaw);

      const completion = await openai.chat.completions.create({
        model: 'o3-mini',
        response_format: { type: "json_object" },
        messages: [
          {
            role: 'system',
            content: `Ты — аналитик недвижимости. Разбери пользовательский запрос и оцени стоимость недвижимости на основе предоставленных данных.`,
          },
          {
            role: 'user',
            content: JSON.stringify({
              query: request.originalText,
              crm_data: crmData,
              prompt: `Разбери запрос на параметры:
              - Тип объекта
              - Количество комнат
              - Район/адрес
              Рассчитай среднюю стоимость кв.м и укажи количество использованных объектов.
              Верни JSON со структурой:
              {
                "avg_price_per_sqm": <число>,
                "num_objects": <число>
              }`,
            }),
          },
        ],
      });

      if (!completion.choices || completion.choices.length === 0) {
        console.error('GPT вернул пустой ответ.', completion);
        throw new Error('GPT вернул пустой ответ[1].');
      }
      const content = completion.choices[0].message.content;

      if (content) {
        return JSON.parse(content);
      } else {
        throw new Error('GPT вернул пустой ответ[2].');
      }
    } catch (error) {
      console.error('Ошибка при запросе или обработке ответа:', error);
      throw error;
    }
  }
}
