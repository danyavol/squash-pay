import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: {
        name: "Squash Pay",
        short_name: "Squash Pay",
        description: "Split squash payments and share expenses with friends",
        display: "standalone",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any",
          },
        ],
        categories: ["finance", "utilities"],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
      },
    }),
  ],
});
