# CSV Performance Tests
There are a bunch of CSV parsers, so this is an attempt to compare them. You can run the tests using `npm test`

These tests only cover streaming CSV parsers because if you're looking at non-streaming parsers then you don't care about performance.

Also, we don't care about type conversion or other features like that because they don't belong in the core of a CSV parser. We've disabled type conversion to make the playing field as level as possible, but it's probably not perfect.

## Results
Here's what I get from running this on my own machine:

package                                             | time (lower is better)
--------------------------------------------------- | ----------------------
[csv-parser](https://npmjs.com/packages/csv-parser) | 5.573s
[fast-csv](https://npmjs.com/packages/fast-csv)     | 9.684s
[binary-csv](https://npmjs.com/packages/binary-csv) | 13.189s
[csvtojson](https://npmjs.com/packages/csvtojson)   | 13.246s

raw output:

```
# binary-csv
basic requires: 4ms
require lib: 15ms
process csv: 12846ms

real    0m13.189s
user    0m11.720s
sys    0m2.200s

# csv-parser
basic requires: 4ms
require lib: 4ms
process csv: 5467ms

real    0m5.573s
user    0m4.132s
sys    0m2.208s

# csvtojson
basic requires: 5ms
require lib: 18ms
process csv: 9726ms

real    0m13.246s
user    0m11.852s
sys    0m2.248s

# fast-csv
basic requires: 5ms
require lib: 51ms
process csv: 9522ms

real    0m9.684s
user    0m8.436s
sys    0m2.212s

sha sums to ensure all the resulting files are the same:
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/binary-csv.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csv-parser.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csvtojson.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/fast-csv.json
```
