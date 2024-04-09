import { IRightechScooter, IScooter } from "../scooter/scooter.interface";

export interface IStartTripRoot {
  uuid: string;
  tripInfo: IStartTrip;
}

type TripPricing = {
  minute: number;
  pause: number;
};

type PauseIntervals = {
  start: string | null;
  end: string | null;
};

export interface IStartTrip {
  id: number;
  startTime: string;
  uuid: string;
  tariffId: number;
  pricing: TripPricing;
  scooter: Scooter;
  pauseIntervals?: PauseIntervals[];
}

export interface Scooter {
  scooter: IScooter;
  rightechScooter: IRightechScooter;
}
