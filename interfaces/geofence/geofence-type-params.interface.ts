export interface IGeofenceTypeParams {
  id: number;
  zoneTimeCondition: string | null;
  parkingFinePrice: number | null;
  speedReduction: number;
  notificationMessage: string;
  geofenceTypeId: number;
}
