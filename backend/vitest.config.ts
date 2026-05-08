<<<<<<< HEAD
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    env: {
      AUTH0_AUDIENCE: 'test-audience',
      AUTH0_ISSUER_BASE_URL: 'https://test.auth0.com',
      CLIENT_ORIGIN: 'http://localhost:5173',
    },
  },
})
=======
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: ["src/**/*.ts"],
      exclude: ["src/generated/**", "src/index.ts"],
    },
  },
});
>>>>>>> 8893a3bb2177e4c24c6e2e973b180082dead1b5f
