import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { type ManifestOptions, VitePWA } from "vite-plugin-pwa";

type MissingManifestTypes = {
  version: string;
  manifest_version: number;
  permissions?: string[];
};

const manifest: MissingManifestTypes & Partial<ManifestOptions> = {
  manifest_version: 3,
  name: "Squash Pay",
  version: "1.0.0",
  short_name: "Squash Pay",
  description: "Split squash payments and share expenses with friends",
  display: "standalone",
  orientation: "portrait-primary",
  icons: [
    {
      src: "/pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-maskable-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/pwa-maskable-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
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
      // Manifest icons are added using 'workbox.globPatterns'
      includeManifestIcons: false,
      manifest: manifest,
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
