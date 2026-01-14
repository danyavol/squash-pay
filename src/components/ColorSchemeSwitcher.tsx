import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

export const ColorSchemeSwitcher = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        colorScheme === "dark" ? "#242424" : "#ffffff",
      );
    }
  }, [colorScheme]);

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
