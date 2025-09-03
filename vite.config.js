import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [".csb.app"], // allow all CodeSandbox preview hosts
    host: true, // bind to all interfaces
    port: 5173,
  },
});
