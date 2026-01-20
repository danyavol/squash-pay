import { type ReactElement } from "react";
import { RouteId, type RouteIdType } from "../../consts/route-ids.ts";
import { Logo } from "../Logo/Logo.tsx";
import { BackButton, PageTitle } from "./TopBarUtils.tsx";

type ConfigItem = {
  routeId: RouteIdType;
  component: () => ReactElement;
};

export const config: ConfigItem[] = [
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

export const getDefaultTopBar = () => (
  <>
    <BackButton />
  </>
);

export const hideTopBarAtPages: RouteIdType[] = [RouteId.ShareNewPayment];
