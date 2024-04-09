import { instance } from "@/api/axios";
import { IScooterData } from "@/interfaces/scooter/scooter.interface";

class ScooterService {
  async getAll(): Promise<IScooterData[]> {
    const response = await instance.get("/scooter/mobile/test");
    return response.data;
  }
}

export default new ScooterService();
