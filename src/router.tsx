import { createBrowserRouter, Navigate } from "react-router";
import App from "./App.tsx";
import { Payments, Friends, Settings, NewPayment, EditPayment } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Payments },
      { path: "new", Component: NewPayment },
      { path: "edit/:paymentId", Component: EditPayment },
      { path: "friends", Component: Friends },
      { path: "settings", Component: Settings },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);
