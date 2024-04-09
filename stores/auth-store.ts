import { create } from "zustand";

interface AuthState {
  phoneNumber: string | null;
  setPhoneNumber: (phone: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phone: string | null) => {
    set({ phoneNumber: phone });
  },
}));
