import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    host: true, // Expose the server on all network interfaces
    open: false, // Disable automatic opening in Docker
    watch: {
      usePolling: true, // Ensure file changes are detected in Docker
    },
  },
});
