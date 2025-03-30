#!/usr/bin/env node

import { program } from "commander";
import { config } from "dotenv";
import { loadPlugins, usePluginsFor } from "plugins";

import packageJson from "../src/package.cjs";
import openaiInit from "../src/openai.js";
import requestSnippet from "../src/snippet-requester.js";

config();

const cliArgumentParser = program
  .name(packageJson.name)
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .argument("[request]", "Use arguments as string to request snippets")
  .option("--exp-plugin", "Enable plugins to run")
  .option("--plugin-enable <plugin>", "Enable a plugin")
  .option("--plugin-disable <plugin>", "Disable a plugin")
  .option("-V,--verbose", "Enable verbose output")
  .allowUnknownOption(); // Allow flags for plugins

const openai = openaiInit();

cliArgumentParser.parse();

await loadPlugins();

await usePluginsFor("onStart", cliArgumentParser.opts());
const opts = cliArgumentParser.opts();

if (cliArgumentParser.args.length) {
  const request = cliArgumentParser.args.join(" ");

  try {
    const snippet = await requestSnippet(request, openai);
    const snippetPosRequest = await usePluginsFor(
      "onSnippetRequestResponse",
      snippet
    );

    if (snippetPosRequest) {
      console.log(snippetPosRequest);
    }
  } catch (e) {
    console.error(e.message);
    if (opts.verbose) {
      console.error(e);
    }
  }
} else {
  process.stdin.on("data", async (data) => {
    try {
      const snippet = await requestSnippet(`${data}`, openai);

      const snippetPosRequest = await usePluginsFor(
        "onSnippetRequestResponse",
        snippet
      );

      if (snippetPosRequest) {
        console.log(snippetPosRequest);
      }
    } catch (e) {
      console.error(e.message);
      if (opts.verbose) {
        console.error(e);
      }
    }
  });
}

await usePluginsFor("onClose");
