import fs from "fs";
import { promisify } from "util";

const writeFilePromise = promisify(fs.writeFile);
const readFilePromise = promisify(fs.readFile);

const configFolder = ".snipgpt/";
const configFilePath =
  process.env.PLUGINS_PATH ||
  `${process.env.HOME}/${configFolder}/plugins-configs`;

let packages = [
  "plugins/snipgpt-history/index.js",
  "plugins/snipgpt-logger/index.js",
];

let plugins = [];
export const loadPlugins = async () => {
  plugins = (
    await Promise.all(
      packages.map(async (pluginPath) => {
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

export const setPluginsSettings = async (newConfig) => {
  if (!fs.existsSync(configFolder)) {
    fs.mkdirSync(configFolder);
  }

  let config;
  if (!fs.existsSync(configFilePath)) {
    try {
      const configFile = await readFilePromise(configFilePath);
      config = JSON.parse(configFile);
    } catch (err) {
      console.error(`Error loading config file: ${err}`);
    }
  }

  await writeFilePromise({ ...config, ...newConfig });
};
