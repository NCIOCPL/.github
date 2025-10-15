#!/usr/bin/env bash

commitlintcmd=$(which commitlint)
testStatus=0

if [ $? != 0 ]; then
  echo "Please install commitlint"
  exit 1
fi

for f in ./tests/positive*.txt
do
  echo "=========================================="
  cat "$f" | $commitlintcmd -q -g ./.github/workflows/commitlint.config.cjs
  if [ $? != 0 ]; then
    testStatus=1
    echo "Failed: Test $f produced a failing commitlint (unexpected)."
    cat "$f" | $commitlintcmd -V -g ./.github/workflows/commitlint.config.cjs
  else
    echo "Passed: Test $f"
  fi
done

for f in ./tests/negative*.txt
do
  echo "=========================================="
  cat "$f" | $commitlintcmd -q -g ./.github/workflows/commitlint.config.cjs
  if [ $? == 0 ]; then
    testStatus=1
    echo "Failed: Test $f produced a passing commitlint (unexpected)."
    cat "$f" | $commitlintcmd -V -g ./.github/workflows/commitlint.config.cjs
    echo "and after"
  else
    echo "Passed: Test $f"
  fi
done

exit $testStatus