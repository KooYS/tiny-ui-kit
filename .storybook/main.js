const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@emotion/core': toPath('node_modules/@emotion/react'),
        '@emotion/styled': toPath('node_modules/@emotion/styled'),
        '@emotion/styled/macro': toPath('node_modules/@emotion/styled/macro'),
      },
    },
  }),
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
