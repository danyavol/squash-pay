import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.tsx";
import { TopBar } from "./components/TopBar/TopBar.tsx";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <TopBar />
      </AppShell.Header>
      <AppShell.Footer>
        <NavigationBar />
      </AppShell.Footer>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
