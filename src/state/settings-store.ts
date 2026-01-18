import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsStore = {
  rounding: "exact" | "round" | "round-up";
  blikNumber: string;
  revolutUsername: string;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (_set) => ({
      rounding: "exact",
      blikNumber: "",
      revolutUsername: "",
    }),
    {
      name: "settings-storage",
    },
  ),
);
