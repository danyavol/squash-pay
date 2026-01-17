import styles from "./NavigationBar.module.scss";
import { NavLink, useLocation } from "react-router";
import { useEffect, useMemo } from "react";
import { Text, Group } from "@mantine/core";
import classnames from "classnames";
import { hideNavigationBatAtPages, tabs } from "./navigation-bar-config.tsx";

type NavigationBarProps = {
  onVisibilityChange: (isVisible: boolean) => void;
};

export const NavigationBar = ({ onVisibilityChange }: NavigationBarProps) => {
  const location = useLocation();

  const activeTabIndex = useMemo(() => {
    return tabs.findIndex((tab) =>
      [tab.to, ...(tab.additionalRoutes ?? [])].includes(location.pathname),
    );
  }, [location]);

  const isVisible = useMemo(
    () => !hideNavigationBatAtPages.includes(location.pathname),
    [location],
  );

  useEffect(() => {
    onVisibilityChange(isVisible);
  }, [isVisible]);

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
