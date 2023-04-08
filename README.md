# snipgpt

A CLI to generate short snippets using OpenAI LLM

See also: [snipgpt.nvim](https://github.com/cristianoliveira/snipgpt.nvim)

### Demo

![snipgpt demo](https://raw.githubusercontent.com/cristianoliveira/snipgpt/main/snipgpt-demo.png)

## Usage

As a repl:
```bash
npx snipgpt
# another example
npx snipgpt > index.js
```

Pipe a request
```bash
echo "post json using curl" | npx snipgpt
```

## Getting started

Clone this repo and install the dependencies.

```bash
git clone git@github.com:cristianoliveira/snipgpt.git
cd snipgpt
npm i
```

Obtain your OpenAI key following these [instructions](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key).

```bash
cp .env.example .env
# edit the file with your key
echo "OPENAI_API_KEY=your-key" > .env
```

All good. Now run start it:

```bash
npm start
```

It will open a prompt where you can request for short snippets. It also works
for other stuff, for instance, to ask for examples of how to use a given
command from the coreutils.

It allows you to pipe request. See: `./example.sh`

## LICENSE

I don't care. AKA: MIT.
