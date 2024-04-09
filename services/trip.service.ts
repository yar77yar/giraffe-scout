import { instance } from "@/api/axios";
import { IStartTripRoot } from "@/interfaces/trip/start-trip.interface";
import { ITrip } from "@/interfaces/trip/trip.interface";

class TripService {
  async getAll(): Promise<ITrip[]> {
    const response = await instance.get("/trip/user-trips");
    return response.data;
  }

  async getOne(id: string | null): Promise<ITrip | null> {
    if (!id) return null;

    const response = await instance.get(`/trip/user-trips/${id}`);
    return response.data;
  }

  async start(scooterId: string, tariffId: number): Promise<IStartTripRoot> {
    const response = await instance.post("/trip-process/start", {
      scooterId,
      tariffId,
    });

    return response.data;
  }

  async end(tripId: number, tripUUID: string): Promise<ITrip> {
    const response = await instance.post("/trip-process/end", {
      tripId,
      tripUUID,
    });

    return response.data;
  }

  async getActiveTrips(): Promise<IStartTripRoot[]> {
    const response = await instance.get("/trip-process/active-trips");
    return response.data;
  }

  async pauseOn(activeTripUUID: string): Promise<IStartTripRoot> {
    const response = await instance.post("/trip-process/pause-on", {
      activeTripUUID,
    });

    return response.data;
  }

  async pauseOff(activeTripUUID: string): Promise<IStartTripRoot> {
    const response = await instance.post("/trip-process/pause-off", {
      activeTripUUID,
    });

    return response.data;
  }

  async savePhoto(photo: string, tripId: number): Promise<ITrip> {
    const response = await instance.post("/trip-process/save-picture", {
      photo,
      tripId,
    });

    return response.data;
  }
}

export default new TripService();
