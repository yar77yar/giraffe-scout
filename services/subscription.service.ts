import { instance } from "@/api/axios";
import { ISubscription } from "@/interfaces/subscription/subscription.interface";
import { SubsciptionsOptions } from "@/interfaces/user/user.interface";

type UpdateSubscriptionDto = {
  autoPayment: boolean;
};

class SubscriptionService {
  async getAll(): Promise<ISubscription[]> {
    const response = await instance.get("/subscription");
    return response.data;
  }

  async updateOptions(
    id: number,
    dto: UpdateSubscriptionDto
  ): Promise<SubsciptionsOptions> {
    const response = await instance.patch(`/subscription/options/${id}`, dto);
    return response.data;
  }
}

export default new SubscriptionService();
