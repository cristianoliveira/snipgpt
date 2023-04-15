#! /usr/bin/env node

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
  .allowUnknownOption(); // Allow flags for plugins

const openai = openaiInit();

cliArgumentParser.parse();

loadPlugins();

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