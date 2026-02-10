import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Replace REPO_NAME with your GitHub repo name
const REPO_NAME = "praveen-kumar-bounteous";

export default defineConfig({
  base: `/${REPO_NAME}/`, 
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
