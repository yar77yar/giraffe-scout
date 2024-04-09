export interface ITariff {
  id: number;
  name: string;
  boardingCost: number;
  minuteCost: number;
  pauseCost: number;
  fixedCost: any;
  reservationCost: number;
  colorHex: string;
  status: string;
  addedDate: string;
}
