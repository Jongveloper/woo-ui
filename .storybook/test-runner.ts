import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler?.innerHTML();

    if (innerHTML) {
      await page.evaluate((html) => {
        const root = document.querySelector('#storybook-root');
        if (root) {
          root.innerHTML = html;
        }
      }, innerHTML);
    }
  },
};

export default config;

