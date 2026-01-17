import { Stack, Text } from "@mantine/core";
import { ColorSchemeSwitcher } from "../components/ColorSchemeSwitcher.tsx";

export const Settings = () => {
  return (
    <Stack>
      <Text>Settings Page</Text>
      <ColorSchemeSwitcher />
    </Stack>
  );
};
