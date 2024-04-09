import { defaultInstance } from "@/api/axios";

class AuthService {
  async sendCode(phone: string): Promise<string> {
    const response = await defaultInstance.post("/auth/mobile/auth", {
      phone: phone,
    });
    return response.data;
  }

  async confirmAuth(code: number): Promise<string> {
    const response = await defaultInstance.post("/auth/mobile/confirm", {
      code: code,
    });
    return response.data;
  }
}

export default new AuthService();
