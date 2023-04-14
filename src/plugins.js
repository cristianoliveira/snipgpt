let plugins = [];
export const loadPlugins = async () => {
  plugins = (
    await Promise.all(
      [].map(async (pluginPath) => {
        try {
          const { default: pluginDefaultExport } = await import(pluginPath);
          return pluginDefaultExport;
        } catch (err) {
          console.error("Error while importing plugin: ", pluginPath, err);
        }
      })
    )
  ).filter((isPresent) => isPresent);
};

export const usePluginsFor = async (pluginListener, args) => {
  return await plugins.reduce(
    async (a, p) => (await p[pluginListener]?.(await a)) || a,
    Promise.resolve(args)
  );
};
