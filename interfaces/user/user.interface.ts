import { IPaymentMethod } from "../payment/payment-method.interface";

export type Payment = {
  id: number;
  service: string;
  type: string;
  status: string;
  description: string;
  amount: string;
  datetimeCreated: Date;
  paymentMethod: IPaymentMethod;
};

export type SubsciptionsOptions = {
  id: number;
  purchaseDate: string;
  expDate: string;
  autoPayment: boolean;
  subscriptionId: number;
  userId: number;
};

export interface IUser {
  id: number;
  clientId: string;
  name: string | null;
  phone: string;
  email: string | null;
  balance: number;
  spending: number | null;
  lastActivity: Date;
  dateTimeCreated: Date;
  status: string;
  activePaymentMethod: number;
  subscriptionId: number;
  trips: [];
  paymentMethods: IPaymentMethod[];
  payments: Payment[];
  subscriptionsOptions: SubsciptionsOptions | null;
}
