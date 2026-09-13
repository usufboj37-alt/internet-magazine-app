import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    proxy: {
      "/api": {
        target: "http://app.local",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/uploads": {
        target: "http://app.local",
        changeOrigin: true,
      },
      "/acc-uploads": {
        target: "http://app.local",
        changeOrigin: true,
      },
      "/ws": {
        target: "ws://app.local",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
