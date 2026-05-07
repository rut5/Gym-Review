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
