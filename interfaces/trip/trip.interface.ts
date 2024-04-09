export interface ITrip {
  id: number;
  tripId: string;
  startTime: string;
  endTime: string;
  travelTime: string;
  photo: string | null;
  bonusesUsed: string | null;
  price: number;
  distance: number;
  userId: number;
  rating: number;
  tariffId: number;
  scooterId: number;
  coordinates: any;
  scooter: Scooter;
  tariff: Tariff;
}

export interface Scooter {
  deviceId: string;
}

export interface Tariff {
  name: string;
  minuteCost: number;
  boardingCost: number;
  colorHex: string;
}
