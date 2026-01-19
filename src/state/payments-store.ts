import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PaymentData } from "./new-payment-store.ts";

export type Payment = PaymentData & {
  id: number;
  isDeleted: boolean;
};

type PaymentsStore = {
  payments: Payment[];
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
