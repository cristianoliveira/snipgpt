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
    return result.response.content;
  }

  const completionArgs = await usePluginsFor("onCreateCompletionPrepare", {
    prompt: PROMPT_TEMPLATE.replace("{request}", request),
  });

  const response = await openai.createCompletion(completionArgs);

  const pluginResult = await usePluginsFor("onCreateCompletionResponse", {
    request,
    response,
  });

  if (pluginResult) {
    return pluginResult.response.content;
  }

  return pluginResult.response.content
};
