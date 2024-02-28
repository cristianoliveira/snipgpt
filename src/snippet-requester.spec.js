import snippetRequest from "./snippet-requester";
import * as plugins from "plugins";

jest.spyOn(plugins, "loadPlugins").mockImplementation();

describe("snippetRequest", () => {
  it("returns a code snippet for a given request", async () => {
    const request = "bash: Check if a variable is not empty";
    const expectedSnippet =
      'if [ -n "$my_variable" ]; then\n    echo "my_variable is not empty"\nelse\n    echo "my_variable is empty"\nfi';

    const openai = {
      createCompletion: jest.fn().mockResolvedValue({
        content: expectedSnippet,
      }),
    };

    expect(await snippetRequest(request, openai)).toEqual(expectedSnippet);
    expect(openai.createCompletion).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining(request),
      })
    );
  });

  it("returns empty response for a request that is smaller than a word", async () => {
    const request = "fo";
    const expectedSnippet = "";

    const openai = {
      createCompletion: jest.fn().mockResolvedValue({
        data: {
          choices: [{ text: expectedSnippet }],
        },
      }),
    };

    expect(await snippetRequest(request, openai)).toEqual(expectedSnippet);

    expect(openai.createCompletion).not.toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining(request),
      })
    );
  });
});
