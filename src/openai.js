import OpenAIApi from "openai";

export default () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

  return {
    createCompletion: async ({ prompt, ...args }) => {
      const res = await openai.chat.completions.create({
        ...args,
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        max_tokens: 1600,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
        stop: ["---"],
      });

      return {
        content: res.choices[0].message.content,
      };
    }
  };
};
