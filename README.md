# snipgpt ![npm](https://img.shields.io/npm/v/snipgpt?color=red) [![CI checks](https://github.com/cristianoliveira/snipgpt/actions/workflows/on-push.yml/badge.svg?branch=main)](https://github.com/cristianoliveira/snipgpt/actions/workflows/on-push.yml)

A CLI to generate short snippets using OpenAI LLM (See also: [snipgpt.nvim](https://github.com/cristianoliveira/snipgpt.nvim))

### Why

**I know what I want to do, but the syntax is on the way.** :)

> Sometimes I just don't remember the syntax when working with a language/lib/coreutils a> nd I just need a snippet to remember how it works. I wanted a helper that could quick give me a tldr of anything I ask.
> -- Impatient developer

Common usages:

- SHELL: Looking for a snippet to use curl and send JSON data. Or I need to use some advanced feature of a CLI like `sed` or `awk`.
- BASH: Sometimes I like to create small bash scripts, but I forget every single time how to do simple things like check if a variable is empty or loop through lists, because of the bash's odd syntax.
- CSS: I know a given selector/property exists, but I forgot the syntax and arguments.
- BOILERPLATE: Sometimes I just need a quick boilerplate to start experimenting on something or just to getting started. (see examples below)
- TEST: To start testing a module, I just need a snippet test scenario and I expand from there.
- ALGORITHMS: I know an algorithm that solves the issue, but I don't remember how to implement it.

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

## Install

```bash
npm i -g snipgpt
```

### With nix flakes
    
```bash
nix profile install github:cristianoliveira/snipgpt
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

### Automated checks

Running unit tests

```bash
npm test
# or
npm test -- --watch
```

## LICENSE

The dude abides. AKA MIT.
