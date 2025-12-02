import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const VIEWPORT_SIZES = {
  mobile: { width: '375px', height: '667px' },
  tablet: { width: '768px', height: '1024px' },
  desktop: { width: '1280px', height: '800px' },
} as const;

const THEME_COLORS = {
  light: '#ffffff',
  dark: '#1c1c1e',
} as const;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: VIEWPORT_SIZES.mobile,
        },
        tablet: {
          name: 'Tablet',
          styles: VIEWPORT_SIZES.tablet,
        },
        desktop: {
          name: 'Desktop',
          styles: VIEWPORT_SIZES.desktop,
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: THEME_COLORS.light },
        { name: 'dark', value: THEME_COLORS.dark },
      ],
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: false,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

