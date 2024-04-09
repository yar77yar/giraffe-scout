import { IGofenceType } from "./geofence-type.interface";

type GeofenceScooters = {
  scooterId: number;
};

type CurrentSpeedLimitScheduleZone =
  | "noInterval"
  | "firstInterval"
  | "secondInterval";

export interface IGeofence {
  id: number;
  uuid: string;
  name: string;
  coordinates: string;
  radius: number | null;
  dateTimeCreated: Date;
  allTimeSpeedLimit: number;
  firtsTimePeriodStart: string | null;
  firstTimePeriodEnd: string | null;
  firstSpeedLimit: number;
  secondTimePeriodStart: string | null;
  secondTimePeriodEnd: string | null;
  secondSpeedLimit: number;
  address: string | null;
  img: string | null;
  typeId: number;
  type: IGofenceType;
  scooters: GeofenceScooters[];
  noScooters: boolean;
  currentSpeedLimit: CurrentSpeedLimitScheduleZone;
}
