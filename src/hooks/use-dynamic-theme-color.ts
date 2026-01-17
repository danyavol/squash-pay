import { useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";

export const useDynamicThemeColor = () => {
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        colorScheme === "dark" ? "#242424" : "#ffffff",
      );
    }
  }, [colorScheme]);
};
