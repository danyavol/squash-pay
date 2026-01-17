import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.tsx";
import { TopBar } from "./components/TopBar/TopBar.tsx";
import { useState } from "react";

function App() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 64, collapsed: !isNavBarVisible }}
      padding="md"
    >
      <AppShell.Header>
        <TopBar />
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
