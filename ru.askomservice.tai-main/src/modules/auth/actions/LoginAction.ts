/**
 * LoginAction:
 * Действие для обработки входа в систему.
 */
import { LoginRequestDto } from "../dto/LoginRequestDto";

export class LoginAction {
  async execute(loginRequest: LoginRequestDto): Promise<void> {
    /**
     * В рамках этого метода, нужно проверить токен авторизации с помощью корп сервиса
     * Если токен не валидный, то нужно выбросить ошибку (throw)
     */
  }
}
