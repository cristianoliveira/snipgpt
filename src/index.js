require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const PROMPT_TEMPLATE = `Take my request and generate a code snippet.
Request: bash: Check if a variable is not empty
Response:
if [ -n "$my_variable" ]; then
    echo "my_variable is not empty"
else
    echo "my_variable is empty"
fi

Request: array reduce with short explaining comments in js
Response:
// reduce takes an array and reduces it to a single value
const array = [1, 2, 3, 4];
const reducedValue = array.reduce((accumulator, currentValue) => {
  // accumulator is the running total of the reduction
  // currentValue is the current element being processed in the array
  return accumulator + currentValue;
}, 0); // 0 is the initial value of the accumulator

console.log(reducedValue); // 10

Request: "Print all variables of a list, in pseudo-code"
Response:
// list is an array of variables
for each variable in list:
    print variable
end
---
Request: "{request}"
Response:`;

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

process.stdin.on("data", function (data) {
  requestSnippet(data.toString());
});