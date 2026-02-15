import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Rounding = "exact" | "round" | "round-up";

type SettingsStore = {
  rounding: Rounding;
  setRounding: (rounding: Rounding) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      rounding: "exact",
      setRounding: (rounding) => set({ rounding }),
    }),
    {
      name: "global-settings-storage",
    },
  ),
);
