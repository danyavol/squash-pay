import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PaymentData } from "./new-payment-store.ts";

type PaymentsStore = {
  payments: PaymentData[];
};

export const usePaymentsStore = create<PaymentsStore>()(
  persist(
    (_set) => ({
      payments: [],
    }),
    {
      name: "settings-storage",
    },
  ),
);
