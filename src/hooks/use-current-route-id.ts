import { useMatches } from "react-router";
import { AllRouteIds, RouteId, type RouteIdType } from "../consts/route-ids.ts";

export const useCurrentRouteId = (): RouteIdType => {
  const matches = useMatches();
  const currentRouteId = matches[matches.length - 1]?.id as RouteIdType;

  return AllRouteIds.includes(currentRouteId)
    ? currentRouteId
    : RouteId.UNKNOWN;
};
