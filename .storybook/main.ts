import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    // @ts-expect-error - @tailwindcss/vite doesn't provide type definitions
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': join(__dirname, '../src'),
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom'],
      },
      server: {
        fs: {
          allow: ['..'],
        },
      },
    });
  },
  
  
  
  docs: {
    autodocs: 'tag',
  },
  
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  },
};

export default config;

