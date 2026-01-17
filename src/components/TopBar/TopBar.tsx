import { useLocation, type Location } from "react-router";
import { type ReactElement, useMemo } from "react";
import { Logo } from "../Logo/Logo.tsx";
import { Group } from "@mantine/core";
import { BackButton, PageTitle } from "./TopBarUtils.tsx";

type ConfigItem = {
  match: (location: Location) => boolean;
  component: () => ReactElement;
};

const config: ConfigItem[] = [
  {
    match: (l) => l.pathname === "/",
    component: () => <Logo />,
  },
  {
    match: (l) => l.pathname === "/new",
    component: () => (
      <>
        <BackButton />
        <PageTitle>New Payment</PageTitle>
      </>
    ),
  },
  {
    match: (l) => l.pathname === "/friends",
    component: () => (
      <>
        <BackButton />
        <PageTitle>My Friends</PageTitle>
      </>
    ),
  },
  {
    match: (l) => l.pathname === "/settings",
    component: () => (
      <>
        <BackButton />
        <PageTitle>Settings</PageTitle>
      </>
    ),
  },
];

const getDefaultTopBar = () => <>5</>;

export const TopBar = () => {
  const location = useLocation();

  const topBar = useMemo(() => {
    const item = config.find((item) => item.match(location));

    if (item) return item.component();
    else return getDefaultTopBar();
  }, [location]);

  return (
    <Group h="100%" px="md">
      {topBar}
    </Group>
  );
};
