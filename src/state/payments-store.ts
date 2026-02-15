import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  defaultNewPaymentValues,
  type PaymentData,
} from "./new-payment-store.ts";

export type Payment = PaymentData & {
  id: number;
  isDeleted: boolean;
};

type PaymentsStore = {
  payments: Payment[];
};

const OLD_STORAGE_KEY = "settings-storage";
const NEW_STORAGE_KEY = "payments-storage";

// TODO: Remove after all users migrated to new name of the storage
if (
  !localStorage.getItem(NEW_STORAGE_KEY) &&
  localStorage.getItem(OLD_STORAGE_KEY)
) {
  localStorage.setItem(NEW_STORAGE_KEY, localStorage.getItem(OLD_STORAGE_KEY)!);
  localStorage.removeItem(OLD_STORAGE_KEY);
}

export const usePaymentsStore = create<PaymentsStore>()(
  persist(
    (_set) => ({
      payments: [],
    }),
    {
      name: NEW_STORAGE_KEY,
      merge: (persisted, current) => {
        if (!persisted) return current;

        const persistedState = persisted as PaymentsStore;
        return {
          ...current,
          ...persistedState,
          payments: persistedState.payments.map((p) => ({
            // If new fields introduced in payment form - automatically update
            // old existing stored data and set the default value
            ...defaultNewPaymentValues,
            ...p,
          })),
        };
      },
    },
  ),
);
