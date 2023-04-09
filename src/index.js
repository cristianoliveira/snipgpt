#! /usr/bin/env node

import { program } from "commander";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import packageJson from "./package.cjs";

import requestSnippet from "./snippet-requester.js";

config();

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable");
  process.exit(1); // exits the process with an error code of 1
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

program
  .name("snipgpt")
  .version(packageJson.version, "-v, --version")
  .description(packageJson.description)
  .argument("[request]", "Use arguments as string to request snippets")
  .parse();

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
