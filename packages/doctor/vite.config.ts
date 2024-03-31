import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    proxy: {
      "/fhir": {
        target: "http://128.140.65.237",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
  },
});
