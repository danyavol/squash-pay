import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.scss";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  primaryColor: "orange",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications limit={2} />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
