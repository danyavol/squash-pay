import Payments from "../../assets/icons/payments.svg?react";
import PaymentsFilled from "../../assets/icons/payments-filled.svg?react";
import GroupIcon from "../../assets/icons/group.svg?react";
import GroupIconFilled from "../../assets/icons/group-filled.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import SettingsFilled from "../../assets/icons/settings-filled.svg?react";
import type { ReactElement } from "react";

type Tab = {
  icon: ReactElement;
  iconActive: ReactElement;
  title: string;
  to: string;
  additionalRoutes?: string[];
};

export const tabs: Tab[] = [
  {
    icon: <Payments />,
    iconActive: <PaymentsFilled />,
    title: "Payments",
    to: "/",
    additionalRoutes: ["/new"],
  },
  {
    icon: <GroupIcon />,
    iconActive: <GroupIconFilled />,
    title: "Friends",
    to: "/friends",
  },
  {
    icon: <Settings />,
    iconActive: <SettingsFilled />,
    title: "Settings",
    to: "/settings",
  },
];

export const hideNavigationBatAtPages = ["/new"];
