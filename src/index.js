#! /usr/bin/env node

import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

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

process.stdin.on("data", async (data) => {
  const snippet = await requestSnippet(data?.toString(), openai);

  if (!snippet) {
    return;
  }

  console.log(snippet);
});
