# CSV Performance Tests
There are a bunch of CSV parsers, so this is an attempt to compare them. You can run the tests using `npm test`

These tests only cover streaming CSV parsers because if you're looking at non-streaming parsers then you don't care about performance.

Also, we don't care about type conversion or other features like that because they don't belong in the core of a CSV parser. We've disabled type conversion to make the playing field as level as possible, but it's probably not perfect.

## Results
Here's what I get from running this on my own machine:

package                                             | time (lower is better)
--------------------------------------------------- | ----------------------
[csv-parser](https://npmjs.com/packages/csv-parser) | 5.974s
[csv-parse](https://npmjs.com/package/csv-parse)    | 9.418s
[fast-csv](https://npmjs.com/packages/fast-csv)     | 10.016s
[csvtojson](https://npmjs.com/packages/csvtojson)   | 12.904s
[binary-csv](https://npmjs.com/packages/binary-csv) | 13.149s

raw output:

```
# binary-csv
basic requires: 5ms
require lib: 14ms
process csv: 13037ms

real	0m13.149s
user	0m11.456s
sys	0m2.564s

# csv-parse
basic requires: 5ms
require lib: 2ms
process csv: 9314ms

real	0m9.418s
user	0m7.768s
sys	0m2.516s

# csv-parser
basic requires: 4ms
require lib: 3ms
process csv: 5868ms

real	0m5.974s
user	0m4.352s
sys	0m2.476s

# csvtojson
basic requires: 4ms
require lib: 16ms
process csv: 9172ms

real	0m12.904s
user	0m11.440s
sys	0m2.360s

# fast-csv
basic requires: 4ms
require lib: 50ms
process csv: 9863ms

real	0m10.016s
user	0m8.616s
sys	0m2.432s

sha sums to ensure all the resulting files are the same:
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/binary-csv.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csv-parse.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csv-parser.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csvtojson.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/fast-csv.json
```
