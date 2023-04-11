#! /usr/bin/env node

import { program } from "commander";
import { config } from "dotenv";

import packageJson from "./package.cjs";

import openaiInit from "./openai.js";
import requestSnippet from "./snippet-requester.js";

config();

program
  .name("snipgpt")
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .argument("[request]", "Use arguments as string to request snippets")
  .parse();

const openai = openaiInit();

if (program.args.length) {
  const snippet = await requestSnippet(program.args.join(" "), openai);

  if (snippet) {
    console.log(snippet);
  }
} else {
  process.stdin.on("data", async (data) => {
    const snippet = await requestSnippet(data?.toString(), openai);

    if (snippet) {
      console.log(snippet);
    }
  });
}
