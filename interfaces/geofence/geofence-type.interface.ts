import { IGeofenceTypeParams } from "./geofence-type-params.interface";

export interface IGofenceType {
  id: number;
  uuid: string;
  name: string;
  subTitle: string | null;
  slug: string;
  img: string | null;
  drawType: string;
  canParking: boolean;
  canRiding: boolean;
  description: string | null;
  secondDescription: string | null;
  parkingPrice: number | null;
  colorHex: string;
  isParkingFine: boolean;
  isScooterBehavior: boolean;
  noiceToTheClient: boolean;
  params: IGeofenceTypeParams;
}

// export enum GeofenceDrawType {
//   POLYGON,
//   CIRCLE,
// }
