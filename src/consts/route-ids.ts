export const RouteId = {
  UNKNOWN: "UNKNOWN",
  Payments: "payments",
  NewPayment: "new-payment",
  ShareNewPayment: "share-new-payment",
  EditPayment: "edit-payment",
  Friends: "friends",
  Settings: "settings",
} as const;

export type RouteIdType = (typeof RouteId)[keyof typeof RouteId];
export const AllRouteIds = Object.values(RouteId);
