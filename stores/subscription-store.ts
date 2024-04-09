import { ISubscription } from "@/interfaces/subscription/subscription.interface";
import { create } from "zustand";

interface SubscriptionState {
  subscriptions: ISubscription[];
  setSubscriptions: (data: ISubscription[]) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: [],
  setSubscriptions: (data: ISubscription[]) => {
    set({ subscriptions: data });
  },
}));
