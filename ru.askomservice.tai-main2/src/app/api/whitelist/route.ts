import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { whitelist } = await req.json();
    
    console.log("✅ Данные получены:", whitelist);

    return NextResponse.json({ message: "Белый список сохранён успешно!" });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при сохранении" }, { status: 500 });
  }
}
