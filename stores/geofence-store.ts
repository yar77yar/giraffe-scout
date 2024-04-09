import { geofenceTypeSlug } from "@/enums/geofenceTypesSlugEnum";
import { IGeofence } from "@/interfaces/geofence/geofence.interface";
import { create } from "zustand";

interface GeofenceState {
  geofences: IGeofence[];
  selectedGeofence: IGeofence | null;
  setGeofences: (data: IGeofence[]) => void;
  setGeofenceType: (geofence: IGeofence | any | null) => void;
}

export const useGeofenceStore = create<GeofenceState>((set) => ({
  geofences: [],
  selectedGeofence: null,
  geofencingEventType: 1,
  setGeofences: (data: IGeofence[]) => {
    set({ geofences: data });
  },
  setGeofenceType: (geofence: IGeofence | any | null) => {
    set({ selectedGeofence: geofence });
  },
}));
