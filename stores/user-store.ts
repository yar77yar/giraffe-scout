import { IUser } from "@/interfaces/user/user.interface";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  paymentUrl: string | null;
  paymentStatus: boolean;
  setUser: (data: IUser) => void;
  setPaymentUrl: (url: string) => void;
  setPaymentStatus: (status: boolean) => void;
  updateUserField: (
    fieldName: string,
    newValue: number | string | object
  ) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  paymentUrl: null,
  paymentStatus: false,
  setUser: (user: IUser) => {
    set({ user: user });
  },
  setPaymentUrl: (url: string) => {
    set({ paymentUrl: url });
  },
  setPaymentStatus: (status: boolean) => {
    set({ paymentStatus: status });
  },
  updateUserField: (fieldName: string, newValue: number | string | object) => {
    set((state) => {
      if (!state.user) {
        return state;
      }

      return {
        user: { ...state.user, [fieldName]: newValue },
      };
    });
  },
}));
