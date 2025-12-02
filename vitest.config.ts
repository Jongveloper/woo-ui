import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vitest/config';

const COVERAGE_THRESHOLDS = {
  lines: 80,
  functions: 90,
  branches: 80,
  statements: 80,
} as const;

const COVERAGE_EXCLUDE_PATTERNS = [
  'node_modules/',
  'dist/',
  '**/*.d.ts',
  '**/*.config.*',
  '**/stories/**',
  '**/*.stories.*',
  'scripts/',
] as const;

const vitePluginsWithKnownTypeConflict = [tailwindcss(), react()];

export default defineConfig({
  plugins: vitePluginsWithKnownTypeConflict as never,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [...COVERAGE_EXCLUDE_PATTERNS],
      thresholds: COVERAGE_THRESHOLDS,
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.storybook', 'storybook-static'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
