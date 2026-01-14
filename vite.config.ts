import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { type ManifestOptions, VitePWA } from "vite-plugin-pwa";

type MissingManifestTypes = {
  version: number;
  manifest_version: number;
  permissions?: string[];
};

const manifest: MissingManifestTypes & Partial<ManifestOptions> = {
  version: 1,
  manifest_version: 3,
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
  permissions: ["clipboardWrite"],
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: manifest,
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
      },
    }),
  ],
});
