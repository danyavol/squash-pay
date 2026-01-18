import { Stack } from "@mantine/core";
import { ColorSchemeSwitcher } from "../components/ColorSchemeSwitcher.tsx";

export const Settings = () => {
  // TODO: Add "reset all data" button, which resets all stores
  // TODO: Display settings from settings store
  return (
    <Stack>
      <ColorSchemeSwitcher />
    </Stack>
  );
};
