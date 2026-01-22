import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.tsx";
import { TopBar } from "./components/TopBar/TopBar.tsx";
import { useState } from "react";
import { useDynamicThemeColor } from "./hooks/use-dynamic-theme-color.ts";
import styles from "./App.module.scss";

function App() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  useDynamicThemeColor();

  return (
    <AppShell
      header={{ height: 60, collapsed: !isTopBarVisible }}
      footer={{ height: 64, collapsed: !isNavBarVisible }}
      classNames={{
        footer: !isNavBarVisible ? styles.collapsedFooter : undefined,
      }}
      padding="md"
    >
      <AppShell.Header>
        <TopBar onVisibilityChange={setIsTopBarVisible} />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <NavigationBar onVisibilityChange={setIsNavBarVisible} />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
