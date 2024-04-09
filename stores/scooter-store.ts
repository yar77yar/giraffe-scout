import {
  IScooter,
  IScooterData,
  IRightechScooter,
} from "@/interfaces/scooter/scooter.interface";
import { create } from "zustand";

type zoomType = "MARKER" | "QR" | null;

export type SelectedScooter = {
  scooter: IScooter;
  rightechScooter: IRightechScooter | undefined;
};

interface ScooterState {
  scooters: IScooterData[];
  selectedScooter: SelectedScooter | null;
  zoomType?: zoomType;
  setSelectedScooter: (
    data: SelectedScooter | null,
    zoomType?: zoomType
  ) => void;
  setScooters: (data: IScooterData[]) => void;
}

export const useScooterStore = create<ScooterState>((set) => ({
  scooters: [],
  zoomType: null,
  selectedScooter: null,
  setSelectedScooter: (
    scooter: SelectedScooter | null,
    zoomType?: zoomType
  ) => {
    set({ selectedScooter: scooter, zoomType: zoomType });
  },
  setScooters: (data: IScooterData[]) => {
    set({ scooters: data });
  },
}));
