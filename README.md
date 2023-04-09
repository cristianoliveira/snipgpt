# snipgpt

A CLI to generate short snippets using OpenAI LLM (See also: [snipgpt.nvim](https://github.com/cristianoliveira/snipgpt.nvim))

### Why

> When working with an unfamiliar language/lib/coreutils, sometimes I just don't remember the syntax. I just need a snippet to remember how it works. Using Google takes too long. ChatGPT is helpful, but, oh boy, it is verbose. Copilot is too annoying (and expensive). 
> 
> -- Impatient developer

Common usages:

- CLIs: Looking for a snippet to use curl and send json data
- CSS: I know a given selector/property exists, but I forgot the syntax and arguments
- BASH: Sometimes I like to create small bash scripts, but I forget every single time how to do simple things like
check if a variable is empty or loop through lists, because of the bash's odd syntax.
- ETC: Any case where I know what I want to do but the syntax is on the way :)

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

Pipe a request
```bash
echo "post json using curl" | npx snipgpt
# For boilerplate
```

To generate a boilerplate of any kind
```bash
echo "node: a package.json for an express app" | npx snipgpt > package.json
echo "node: an express app running on port 8888" | npx snipgpt > index.js 
npm i & npm start
```
It gets the boilerplate right with an incredible accuracy :)


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
