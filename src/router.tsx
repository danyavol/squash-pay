import { createBrowserRouter, Navigate } from "react-router";
import App from "./App.tsx";
import { Payments, Friends, Settings, NewPayment, EditPayment } from "./pages";
import { RouteId } from "./consts/route-ids.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, id: RouteId.Payments, Component: Payments },
      { path: "new", id: RouteId.NewPayment, Component: NewPayment },
      {
        path: "edit/:paymentId",
        id: RouteId.EditPayment,
        Component: EditPayment,
      },
      { path: "friends", id: RouteId.Friends, Component: Friends },
      { path: "settings", id: RouteId.Settings, Component: Settings },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);
