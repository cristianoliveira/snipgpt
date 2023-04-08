#! /usr/bin/env node

require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable");
  process.exit(1); // exits the process with an error code of 1
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PROMPT_TEMPLATE = `Take my request and generate a code snippet.
Request: "bash: Check if a variable is not empty"
Snippet:if [ -n "$my_variable" ]; then
    echo "my_variable is not empty"
else
    echo "my_variable is empty"
fi

Request: "array reduce with short explaining comments in js"
Snippet:// reduce takes an array and reduces it to a single value
const array = [1, 2, 3, 4];
const reducedValue = array.reduce((accumulator, currentValue) => {
  // accumulator is the running total of the reduction
  // currentValue is the current element being processed in the array
  return accumulator + currentValue;
}, 0); // 0 is the initial value of the accumulator

console.log(reducedValue); // 10

Request: "Print all variables of a list, in pseudo-code"
Snippet:// list is an array of variables
for each variable in list:
    print variable
end
---
Request: "{request}"
Snippet:`;

const requestSnippet = async (request) => {
  const { data: response } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: PROMPT_TEMPLATE.replace("{request}", request),
    temperature: 0,
    max_tokens: 1600,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
    stop: ["---"],
  });

  console.log(response.choices[0]?.text);
};

process.stdin.on("data", async (data) => {
  await requestSnippet(data.toString());
});
