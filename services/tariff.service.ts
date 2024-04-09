import { instance } from "@/api/axios";
import { ITariff } from "@/interfaces/tariff/tariff.interface";

class TariffService {
  async getAll(): Promise<ITariff[]> {
    const response = await instance.get("/tariff");
    return response.data;
  }
}

export default new TariffService();
