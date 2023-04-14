#! /usr/bin/env node

import { program } from "commander";
import { config } from "dotenv";

import packageJson from "./package.cjs";

import openaiInit from "./openai.js";
import { loadPlugins, usePluginsFor } from "./plugins.js";
import requestSnippet from "./snippet-requester.js";

config();

const cliArgumentParser = program
  .name("snipgpt")
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .argument("[request]", "Use arguments as string to request snippets")
  .option("--exp-plugin")
  .allowUnknownOption(); // Allow flags for plugins

const openai = openaiInit();

cliArgumentParser.parse();

const opts = cliArgumentParser.opts();
// Experimental plugins
if (opts.expPlugin) {
  loadPlugins();
}

await usePluginsFor("onStart", cliArgumentParser.opts());

if (cliArgumentParser.args.length) {
  const request = cliArgumentParser.args.join(" ");
  const snippet = await requestSnippet(request, openai);

  const snippetPosRequest = await usePluginsFor(
    "onSnippetRequestResponse",
    snippet
  );

  if (snippetPosRequest) {
    console.log(snippetPosRequest);
  }
} else {
  process.stdin.on("data", async (data) => {
    const snippet = await requestSnippet(`${data}`, openai);

    const snippetPosRequest = await usePluginsFor(
      "onSnippetRequestResponse",
      snippet
    );

    if (snippetPosRequest) {
      console.log(snippetPosRequest);
    }
  });
}

await usePluginsFor("onClose");
