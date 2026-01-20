import { useEffect, useMemo } from "react";
import { Group } from "@mantine/core";
import { useCurrentRouteId } from "../../hooks/use-current-route-id.ts";
import {
  config,
  getDefaultTopBar,
  hideTopBarAtPages,
} from "./top-bar-config.tsx";

type TopBarProps = {
  onVisibilityChange: (isVisible: boolean) => void;
};

export const TopBar = ({ onVisibilityChange }: TopBarProps) => {
  const currentRouteId = useCurrentRouteId();

  const topBar = useMemo(() => {
    const item = config.find((item) => item.routeId === currentRouteId);

    if (item) return item.component();
    else return getDefaultTopBar();
  }, [currentRouteId]);

  const isVisible = useMemo(
    () => !hideTopBarAtPages.includes(currentRouteId),
    [currentRouteId],
  );

  useEffect(() => {
    onVisibilityChange(isVisible);
  }, [isVisible]);

  return (
    <Group h="100%" px="md">
      {topBar}
    </Group>
  );
};
