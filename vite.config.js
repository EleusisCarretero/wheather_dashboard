import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  base: "/wheather_dashboard/", // Cambia esto al nombre de tu repositorio en GitHub
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
