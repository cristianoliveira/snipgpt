import fs from "fs";
import util from "util";

let history = [];
const HISTORY_LIMIT = 300;
const historyFilePath = `${process.env.HOME}/.snipgpt-history.json`;

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

let cache = true;
export default {
  onStart: (opts) => {
    cache = !opts["plugin-args"]?.split(" ")?.includes("--no-cache");
  },

  onSnippetRequest: async (request) => {
    if (!cache) {
      return;
    }

    try {
      history = JSON.parse(Buffer.from(await readFilePromise(historyFilePath)));
      const cachedResponse = history.find((h) => h.request === request);
      if (cachedResponse) {
        return {
          result: cachedResponse,
        };
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        return;
      }

      throw err;
    }
  },

  onCreateCompletionResponse: async ({ request, response }) => {
    const cachedResponse = history.find((h) => h.request === request);
    if (cachedResponse) {
      return;
    }

    if (cache) {
      while (history.length >= HISTORY_LIMIT) {
        history.shift();
      }
      history.push({ request, response });
    }
  },

  onClose: async () => {
    await writeFilePromise(historyFilePath, JSON.stringify(history));
  },
};
