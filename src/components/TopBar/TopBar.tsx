import { type ReactElement, useMemo } from "react";
import { Logo } from "../Logo/Logo.tsx";
import { Group } from "@mantine/core";
import { BackButton, PageTitle } from "./TopBarUtils.tsx";
import { useCurrentRouteId } from "../../hooks/use-current-route-id.ts";
import { RouteId, type RouteIdType } from "../../consts/route-ids.ts";

type ConfigItem = {
  routeId: RouteIdType;
  component: () => ReactElement;
};

const config: ConfigItem[] = [
  {
    routeId: RouteId.Payments,
    component: () => <Logo />,
  },
  {
    routeId: RouteId.NewPayment,
    component: () => (
      <>
        <BackButton />
        <PageTitle>New Payment</PageTitle>
      </>
    ),
  },
  {
    routeId: RouteId.EditPayment,
    component: () => (
      <>
        <BackButton />
        <PageTitle>Edit Payment</PageTitle>
      </>
    ),
  },
  {
    routeId: RouteId.Friends,
    component: () => (
      <>
        <BackButton />
        <PageTitle>My Friends</PageTitle>
      </>
    ),
  },
  {
    routeId: RouteId.Settings,
    component: () => (
      <>
        <BackButton />
        <PageTitle>Settings</PageTitle>
      </>
    ),
  },
];

const getDefaultTopBar = () => (
  <>
    <BackButton />
  </>
);

export const TopBar = () => {
  const currentRouteId = useCurrentRouteId();

  const topBar = useMemo(() => {
    const item = config.find((item) => item.routeId === currentRouteId);

    if (item) return item.component();
    else return getDefaultTopBar();
  }, [currentRouteId]);

  return (
    <Group h="100%" px="md">
      {topBar}
    </Group>
  );
};
