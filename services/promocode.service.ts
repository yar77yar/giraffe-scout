import { instance } from "@/api/axios";

class PromocodeService {
  async use(code: string): Promise<any> {
    const response = await instance.post("/promocode/use", {
      code: code,
    });
    return response.data;
  }
}

export default new PromocodeService();
