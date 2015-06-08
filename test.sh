#!/usr/bin/env bash
mkdir -p tmp/

# we use a new node process for every single test, to ensure that it's a clean
# environment each time

printf '# binary-csv\n'
time node test-binary-csv.js

printf '\n# csv-parse\n'
time node test-csv-parse.js

printf '\n# csv-parser\n'
time node test-csv-parser.js

printf '\n# csv-stream\n'
time node test-csv-stream.js

printf '\n# csvtojson\n'
time node test-csvtojson.js

printf '\n# fast-csv\n'
time node test-fast-csv.js

printf '\nsha sums to ensure all the resulting files are the same:\n'
shasum tmp/*
