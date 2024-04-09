import { instance } from "@/api/axios";
import { IUser } from "@/interfaces/user/user.interface";

class UserService {
  async getMe(): Promise<IUser> {
    const response = await instance.get("/user");
    return response.data;
  }

  async update(id: number, data: object): Promise<IUser> {
    const response = await instance.patch(`/user/${id}`, data);
    return response.data;
  }

  async delete() {
    const response = await instance.delete(`/user/delete`);
    return response.data;
  }
}

export default new UserService();
