import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
//https://vitest.dev/config/

const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    css: true,
    // ...other Vitest-specific configurations...
  },
});

export default mergeConfig(viteConfig, vitestConfig);
