# snipgpt

A CLI to generate short snippets using OpenAI LLM (See also: [snipgpt.nvim](https://github.com/cristianoliveira/snipgpt.nvim))

### Why

> When working with an unfamiliar language/lib/coreutils, sometimes I just don't remember the syntax. I just need a snippet to remember how it works. Using Google takes too long. ChatGPT is helpful, but, oh boy, it is verbose. Copilot is a bit inconvenient, it works only on an IDE, and is expensive compared to openai.
>
> -- Impatient developer

Common usages:

- SHELL: Looking for a snippet to use curl and send JSON data. Or I need to use some advanced feature of a CLI like `sed` or `awk`.
- BASH: Sometimes I like to create small bash scripts, but I forget every single time how to do simple things like check if a variable is empty or loop through lists, because of the bash's odd syntax.
- CSS: I know a given selector/property exists, but I forgot the syntax and arguments.
- BOILERPLATE: Sometimes I just need a quick boilerplate to start experimenting on something or just to getting started. (see examples below)

**It works in any case where I know what I want to do, but the syntax is on the way.**  :)

### Demo

![snipgpt demo](https://raw.githubusercontent.com/cristianoliveira/snipgpt/main/snipgpt-demo.png)

## Usage

Prerequisite: Make sure you have set `OPENAI_API_KEY` ([obtaining my secret key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key))

```bash
export OPENAI_API_KEY=yourkey
```

As a repl:

```bash
npx snipgpt
```

Pass the request directly

```bash
npx snipgpt loop in COBOL
```

Pipe a request to it

```bash
echo "post json using curl" | npx snipgpt
```

To generate a boilerplate of any kind

```bash
echo "node: a package.json for an express app" | npx snipgpt > package.json

echo "node: an express app running on port 8888" | npx snipgpt > index.js

npm i && npm start # It gets the boilerplate right with an incredible accuracy :)
```

Generate generic documentations

```bash
echo "a readme of a node app, with 'getting started', 'installation' and 'running' sections" | npx snipgpt > README.md
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

All good. Now run it:

```bash
npm start
```

It will open a prompt where you can request for short snippets. It also works
for other stuff, for instance, to ask for examples of how to use a given
command from the coreutils.

See: `./example.sh`

## LICENSE

The dude abides. AKA MIT.
