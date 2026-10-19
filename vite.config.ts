/// <reference types="vitest/config" />

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Libraries that rarely change get their own files, so returning
        // visitors keep them cached across deploys. The React pattern lists
        // exact packages: a plain /react/ would also catch react-router and
        // react-hook-form, pulling the lazy form's library into this file.
        codeSplitting: {
          groups: [
            {
              name: "vendor-react",
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
            {
              name: "vendor-supabase",
              test: /node_modules[\\/]@supabase[\\/]/,
              priority: 15,
            },
          ],
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
    globals: true,
    env: { TZ: "UTC" },
    execArgv: ["--no-experimental-webstorage"],
  },
});
