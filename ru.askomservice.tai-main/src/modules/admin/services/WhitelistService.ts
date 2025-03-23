import fs from "fs/promises";
import path from "path";
import { UserAccess } from "../dto/UserAccess";

const WHITELIST_FILE = path.resolve(__dirname, "../../../data/whitelist.json");

export class WhitelistService {
  private async readWhitelist(): Promise<UserAccess[]> {
    try {
      const data = await fs.readFile(WHITELIST_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return []; // Если файла нет, возвращаем пустой список
    }
  }

  private async writeWhitelist(whitelist: UserAccess[]): Promise<void> {
    await fs.writeFile(WHITELIST_FILE, JSON.stringify(whitelist, null, 2), "utf-8");
  }

  async listUsers(): Promise<UserAccess[]> {
    return this.readWhitelist();
  }

  async addUser(user: UserAccess): Promise<void> {
    const whitelist = await this.readWhitelist();
    if (!whitelist.find(u => u.identifierValue === user.identifierValue)) {
      whitelist.push(user);
      await this.writeWhitelist(whitelist);
    }
  }

  async removeUser(identifierValue: string): Promise<void> {
    let whitelist = await this.readWhitelist();
    whitelist = whitelist.filter(u => u.identifierValue !== identifierValue);
    await this.writeWhitelist(whitelist);
  }
}
