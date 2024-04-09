export interface ISubscription {
  id: number;
  uuid: string;
  dateTimeCreated: string;
  name: string;
  price: number;
  days: number;
  payForStartTrip: boolean;
}
