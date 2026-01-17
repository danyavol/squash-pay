import Payments from "../../assets/icons/payments.svg?react";
import PaymentsFilled from "../../assets/icons/payments-filled.svg?react";
import GroupIcon from "../../assets/icons/group.svg?react";
import GroupIconFilled from "../../assets/icons/group-filled.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import SettingsFilled from "../../assets/icons/settings-filled.svg?react";
import styles from "./NavigationBar.module.scss";
import { NavLink, useLocation } from "react-router";
import { type ReactElement, useMemo } from "react";
import { Text, Group } from "@mantine/core";
import classnames from "classnames";

type Tab = {
  icon: ReactElement;
  iconActive: ReactElement;
  title: string;
  to: string;
  additionalRoutes?: string[];
};

const tabs: Tab[] = [
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

export const NavigationBar = () => {
  const location = useLocation();

  const activeTabIndex = useMemo(() => {
    return tabs.findIndex((tab) =>
      [tab.to, ...(tab.additionalRoutes ?? [])].includes(location.pathname),
    );
  }, [location]);

  return (
    <Group className={styles.navigationBarRoot} grow gap={0}>
      {tabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <NavLink
            key={index}
            to={tab.to}
            className={classnames(styles.tabRoot, isActive && styles.active)}
          >
            <div className={styles.tabIcon}>
              {isActive ? tab.iconActive : tab.icon}
            </div>
            <Text className={styles.tabTitle}>{tab.title}</Text>
          </NavLink>
        );
      })}
    </Group>
  );
};
