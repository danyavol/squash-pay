import styles from "./NavigationBar.module.scss";
import { NavLink } from "react-router";
import { useEffect, useMemo } from "react";
import { Text, Group } from "@mantine/core";
import classnames from "classnames";
import { hideNavigationBarAtPages, tabs } from "./navigation-bar-config.tsx";
import { useCurrentRouteId } from "../../hooks/use-current-route-id.ts";

type NavigationBarProps = {
  onVisibilityChange: (isVisible: boolean) => void;
};

export const NavigationBar = ({ onVisibilityChange }: NavigationBarProps) => {
  const currentRouteId = useCurrentRouteId();

  const activeTabIndex = useMemo(() => {
    return tabs.findIndex((tab) => tab.activeRouteIds.includes(currentRouteId));
  }, [currentRouteId]);

  const isVisible = useMemo(
    () => !hideNavigationBarAtPages.includes(currentRouteId),
    [currentRouteId],
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
            <Text className={styles.tabTitle} size="sm">
              {tab.title}
            </Text>
          </NavLink>
        );
      })}
    </Group>
  );
};
