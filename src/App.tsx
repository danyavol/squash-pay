import Logo from "./assets/squash-logo.svg?react";
import { AppShell, Group, Title, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.tsx";

function App() {
  const theme = useMantineTheme();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Logo fill={theme.colors.orange[6]} />
          <Title order={3}>Squash Pay</Title>
        </Group>
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
