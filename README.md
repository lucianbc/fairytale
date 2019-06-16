# Fairytale Gone Bad (WIP)
[![Build Status](https://travis-ci.org/lucianbc/fairytale.svg?branch=master)](https://travis-ci.org/lucianbc/fairytale)


Fairytale is a blogging platform that features an AI powered editor to help the creators write their posts.

This is a university project developed for the Software Engineering Course at the University of Bucharest.

## Features
* Smart editor that generates a customizable number of sentences based on the content already written. The text generation is implemented character based LSTM model insbired by (Andrej Karpathy's *The Unreasonable Effectiveness of Recurrent Neural Networks*)[http://karpathy.github.io/2015/05/21/rnn-effectiveness/]

## Installation

```bash
# First, activate Pipenv:
pipenv shell

# Install python dependencies
pipenv install

# Then install the npm dependencies:
npm install
```


## Development

```bash
# Build and frontend app and watch for changes:
npm run dev

# (Optional) Start the django livereload server:
./app/manage.py livereload

# Start the django server:
./app/manage.py runserver
```
