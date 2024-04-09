export interface IScooter {
  id: number;
  deviceId: string;
  qrCode: string;
  serialNumber: string;
  status: ScooterStatus;
  power: boolean;
  rented: boolean;
  addedDate: Date;
  photo: string | null;
  modelId: number;
  model: IScooterModel;
  trips: [];
}

interface IScooterService {
  metersToRent: number;
  metersToBooking: number;
}

export interface IScooterData {
  scooter: IScooter;
  rightechScooter: IRightechScooter;
  settings: IScooterService;
}

export interface IRightechScooter {
  id: string;
  state: {
    lon?: number;
    lat?: number;
    charge?: number;
  };
}

interface IScooterModel {
  id: number;
  modelName: string;
}

type ScooterStatus = "ACTIVE" | "SERVICE" | "REPAIR";
