import { usePluginsFor } from "plugins";

const PROMPT_TEMPLATE = `Take my request and generate a code snippet.
Request: "bash: Check if a variable is not empty"
Snippet:if [ -n "$my_variable" ]; then
    echo "my_variable is not empty"
else
    echo "my_variable is empty"
fi

Request: "array reduce in js include comments"
Snippet:// reduce takes an array and reduces it to a single value
const array = [1, 2, 3, 4];
const reducedValue = array.reduce((accumulator, currentValue) => {
  // accumulator is the running total of the reduction
  // currentValue is the current element being processed in the array
  return accumulator + currentValue;
}, 0); // 0 is the initial value of the accumulator

console.log(reducedValue); // 10

Request: "Print all variables of a list in pseudo-code"
Snippet:for each variable in list:
    print variable
end
---
Request: "{request}"
Snippet:`;

export default async (requestRaw, openai) => {
  if (!requestRaw || requestRaw.length < 3) {
    return "";
  }

  const { result, request = requestRaw } = await usePluginsFor(
    "onSnippetRequest",
    requestRaw
  );

  if (result) {
    return result.response.choices[0]?.text;
  }

  const completionArgs = await usePluginsFor("onCreateCompletionPrepare", {
    model: "text-davinci-003",
    prompt: PROMPT_TEMPLATE.replace("{request}", request),
    temperature: 0,
    max_tokens: 1600,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
    stop: ["---"],
  });

  const { data: response } = await openai.createCompletion(completionArgs);

  const pluginResult = await usePluginsFor("onCreateCompletionResponse", {
    request,
    response,
  });

  if (pluginResult) {
    return pluginResult.response.choices[0]?.text;
  }

  return response.choices[0]?.text;
};
