import { instance } from "@/api/axios";

class PaymentService {
  async addPaymentMethod(dto: object): Promise<any> {
    const response = await instance.post("/payments/add-payment-method", dto);
    return response.data;
  }

  async createPayment(dto: object): Promise<any> {
    const response = await instance.post("/payments/create-payment", dto);
    return response.data;
  }
}

export default new PaymentService();
