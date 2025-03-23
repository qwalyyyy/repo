import { UploadFileDto } from "../dto/UploadFileDto";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.resolve(__dirname, "../../../uploads");

export class UploadCRMDataAction {
  async execute(file: UploadFileDto): Promise<void> {
    try {
      // Проверяем JSON
      JSON.parse(file.content);

      // Создаём директорию, если её нет
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      // Сохраняем файл
      const filePath = path.join(UPLOAD_DIR, file.filename);
      await fs.writeFile(filePath, file.content, "utf-8");

      console.log("File uploaded:", file.filename);
    } catch (error) {
      throw new Error("Invalid JSON format");
    }
  }
}
