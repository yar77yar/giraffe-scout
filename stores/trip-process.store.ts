import { ITariff } from "@/interfaces/tariff/tariff.interface";
import {
  IStartTrip,
  IStartTripRoot,
} from "@/interfaces/trip/start-trip.interface";
import { create } from "zustand";

interface TripProcessStore {
  trips: IStartTripRoot[];
  selectedTripToEnd: IStartTripRoot | null;
  selectedTariff: ITariff | null;
  setTrip: (tripInfo: IStartTripRoot) => void;
  setActiveTrips: (tripsInfo: IStartTripRoot[]) => void;
  deleteTrip: (uuid: string) => void;
  setSelectedTariff: (tariff: ITariff | null) => void;
  setSelectedTripToEnd: (trip: IStartTripRoot | null) => void;
}

export const useTripProcessStore = create<TripProcessStore>((set) => ({
  trips: [],
  selectedTariff: null,
  selectedTripToEnd: null,
  setTrip: (tripInfo: IStartTripRoot) => {
    set((state) => {
      state.trips.push(tripInfo);
      return state;
    });
  },
  setActiveTrips: (tripsInfo: IStartTripRoot[]) => {
    set({ trips: tripsInfo });
  },
  deleteTrip: (uuid: string) => {
    set((state) => ({
      trips: state.trips.filter((item) => item.uuid !== uuid),
    }));
  },
  setSelectedTariff: (tariff: ITariff | null) => {
    set({ selectedTariff: tariff });
  },
  setSelectedTripToEnd: (trip: IStartTripRoot | null) => {
    set({ selectedTripToEnd: trip });
  },
}));
