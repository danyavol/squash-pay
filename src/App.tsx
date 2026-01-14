import Logo from "./assets/squash-logo.svg?react";
import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink as MantineNavLink,
  Flex,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, Outlet } from "react-router";
import { Calculator, BookOpenText, BookUser } from "lucide-react";
import { ColorSchemeSwitcher } from "./components/ColorSchemeSwitcher.tsx";

const navbarLinks = [
  { to: "/new", label: "New payment", icon: Calculator },
  { to: "/", label: "History", icon: BookOpenText },
  { to: "/friends", label: "Friends", icon: BookUser },
  // { to: "/settings", label: "Settings", icon: Settings },
] as const;

function App() {
  const [opened, { toggle, close }] = useDisclosure();
  const theme = useMantineTheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo fill={theme.colors.orange[6]} />
          <Title order={3}>Squash Pay</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Flex direction="column" justify="space-between" h="100%">
          <div>
            {navbarLinks.map((link, index) => (
              <MantineNavLink
                key={index}
                component={NavLink}
                to={link.to}
                label={link.label}
                leftSection={"icon" in link ? <link.icon /> : undefined}
                onClick={close}
              />
            ))}
          </div>
          <Flex justify="end">
            <ColorSchemeSwitcher />
          </Flex>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
