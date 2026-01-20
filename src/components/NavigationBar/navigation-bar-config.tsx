import Payments from "../../assets/icons/payments.svg?react";
import PaymentsFilled from "../../assets/icons/payments-filled.svg?react";
import GroupIcon from "../../assets/icons/group.svg?react";
import GroupIconFilled from "../../assets/icons/group-filled.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import SettingsFilled from "../../assets/icons/settings-filled.svg?react";
import type { ReactElement } from "react";
import { RouteId, type RouteIdType } from "../../consts/route-ids.ts";

type Tab = {
  icon: ReactElement;
  iconActive: ReactElement;
  title: string;
  to: string;
  activeRouteIds: RouteIdType[];
};

export const tabs: Tab[] = [
  {
    icon: <Payments />,
    iconActive: <PaymentsFilled />,
    title: "Payments",
    to: "/",
    activeRouteIds: [RouteId.Payments, RouteId.NewPayment, RouteId.EditPayment],
  },
  {
    icon: <GroupIcon />,
    iconActive: <GroupIconFilled />,
    title: "Friends",
    to: "/friends",
    activeRouteIds: [RouteId.Friends],
  },
  {
    icon: <Settings />,
    iconActive: <SettingsFilled />,
    title: "Settings",
    to: "/settings",
    activeRouteIds: [RouteId.Settings],
  },
];

export const hideNavigationBarAtPages: RouteIdType[] = [
  RouteId.NewPayment,
  RouteId.EditPayment,
  RouteId.ShareNewPayment,
];
