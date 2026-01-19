import { Switch, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";

export const ColorSchemeSwitcher = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const isLight = colorScheme === "light";

  return (
    <Switch
      checked={isLight}
      onChange={toggleColorScheme}
      color="var(--mantine-color-yellow-4)"
      size="lg"
      thumbIcon={
        isLight ? (
          <Sun size="1rem" color="var(--mantine-color-orange-filled)" />
        ) : (
          <Moon size="1rem" color="var(--mantine-color-dark-filled)" />
        )
      }
    />
  );
};
