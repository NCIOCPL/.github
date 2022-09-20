#!/usr/bin/env bash

commitlintcmd=$(which commitlint)

if [ $? != 0 ]; then
  echo "Please Install commitlint"
  exit 1
fi

for f in ./tests/*.txt
do
  cat "$f" | $commitlintcmd -g ./.github/workflows/commitlint.config.js
  if [ $? != 0 ]; then
    echo "Test $f failed."
  fi
done

