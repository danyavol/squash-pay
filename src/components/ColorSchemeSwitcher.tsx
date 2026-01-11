import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";

export const ColorSchemeSwitcher = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <Sun style={{ display: colorScheme === "light" ? "block" : "none" }} />
      <Moon style={{ display: colorScheme === "dark" ? "block" : "none" }} />
    </ActionIcon>
  );
};
