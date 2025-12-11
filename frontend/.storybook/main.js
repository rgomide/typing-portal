

// Set STORYBOOK environment variable to prevent vite.config.js from loading problematic plugins
process.env.STORYBOOK = 'true';

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": "@storybook/vue3-vite",
  "staticDirs": ["../public"],
  async viteFinal(config, { configType }) {
    // Additional safety: Remove any remaining problematic plugins
    const pluginNamesToRemove = [
      'vite-plugin-inspect',
      'vite-plugin-vue-devtools',
      'vite-plugin-vue-inspector'
    ];

    if (config.plugins) {
      config.plugins = config.plugins.filter(plugin => {
        if (!plugin) return false;
        const name = plugin?.name || (typeof plugin === 'function' ? plugin.name : null);
        return !name || !pluginNamesToRemove.includes(name);
      });
    }

    return config;
  }
};
export default config;