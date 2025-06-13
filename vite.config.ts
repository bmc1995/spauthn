import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

/* https://vitest.dev/config/
 * --------------------------------------------------------------------------------------
 * Vitest Testing Configurations (Optional)
 * Uncomment below if you wish to include Vitest configurations in this file instead.
 * Vitest extends `defineConfig` from vite.
 * --------------------------------------------------------------------------------------
 *
 * import { defineConfig } from 'vitest/config';
 *
 * export default defineConfig({
 *   // Vitest configurations here...
 * });
 */
