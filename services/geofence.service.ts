import { instance } from "@/api/axios";
import { IGeofence } from "@/interfaces/geofence/geofence.interface";

class GeofenceService {
  async getAll(): Promise<IGeofence[]> {
    const response = await instance.get("/geofence/mobile");
    return response.data;
  }
}

export default new GeofenceService();
