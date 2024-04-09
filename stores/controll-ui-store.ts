import { create } from "zustand";

interface ControllUiState {
  loading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useControllUiStore = create<ControllUiState>((set) => ({
  loading: false,
  setIsLoading: (value: boolean) => {
    set({ loading: value });
  },
}));
