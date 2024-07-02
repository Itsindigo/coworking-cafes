import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Required
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/components/**/*.stories.tsx"],
  // Optional
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  docs: {
    autodocs: "tag",
  },
  // staticDirs: ["../assets"],
};

export default config;
