import { LocationObject } from "expo-location";
import { create } from "zustand";

interface LocationState {
  location: LocationObject | null;
  setLocationAsync: (value: any) => void;
  setGeofencingEventType: (value: number) => void;
  geofencingEventType: number;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  geofencingEventType: 2,
  setLocationAsync: (value: any) => {
    set({ location: value });
  },
  setGeofencingEventType: (value: number) => {
    set({ geofencingEventType: value });
  },
}));
