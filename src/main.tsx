import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.scss";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";

const theme = createTheme({
  primaryColor: "orange",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
