# Fairytale Gone Bad (WIP)
[![Build Status](https://travis-ci.org/lucianbc/fairytale.svg?branch=master)](https://travis-ci.org/lucianbc/fairytale)


Fairytale is a blogging platform that features an AI powered editor to help the creators write their posts.

This is a university project developed for the Software Engineering Course at the University of Bucharest.

## Features
* Smart editor that generates a customizable number of sentences based on the content already written. The text generation is implemented character based LSTM model insbired by [Andrej Karpathy's *The Unreasonable Effectiveness of Recurrent Neural Networks*](http://karpathy.github.io/2015/05/21/rnn-effectiveness/). At the moment there are 3 models trained on Adventure, Horror and Mistery story genres.
* RTF formatting powered by [DraftJS](https://draftjs.org/)
* Social capabilities including the ability to search and follow users and a feed of the stories written by the ones you follow.

## Technologies
* Front end: React, Redux
* Back end: Django for the main application, Flask for the AI service
* AI: Tensorflow

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

# Start the AI service
python ./ml_service/src/app.py
```
