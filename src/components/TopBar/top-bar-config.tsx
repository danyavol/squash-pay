import { type ReactElement } from "react";
import { RouteId, type RouteIdType } from "../../consts/route-ids.ts";
import { Logo } from "../Logo/Logo.tsx";
import { BackButton, PageTitle } from "./TopBarUtils.tsx";
import { ActionIcon, Flex } from "@mantine/core";
import { Share2 } from "lucide-react";
import { NavLink, useParams } from "react-router";

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
    component: () => {
      const { paymentId } = useParams();

      return (
        <Flex justify="space-between" w="100%">
          <Flex gap="md">
            <BackButton />
            <PageTitle>Edit Payment</PageTitle>
          </Flex>

          <NavLink to={`/share/${paymentId}`}>
            <ActionIcon
              size="lg"
              variant="subtle"
              color="var(--mantine-color-text)"
            >
              <Share2 />
            </ActionIcon>
          </NavLink>
        </Flex>
      );
    },
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
