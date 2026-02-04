import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // map `process` imports/uses to the browser shim provided by the `process` package
      process: "process/browser"
    }
  },
  define: {
    // keep these
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
  }
});
