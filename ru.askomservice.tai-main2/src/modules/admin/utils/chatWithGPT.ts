export async function chatWithGPT(content: string, options: any): Promise<string> {
    // Ожидаем второй параметр (например, для дополнительных настроек)
    const prompt = `Проанализируй следующий текст: ${content}`;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'openai/gpt-4', // Настройки по умолчанию
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();
    return data.choices[0].message.content.trim();
  }
