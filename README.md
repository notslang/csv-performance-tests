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

## Other Libs That Weren't Even Worth Installing
- [basic-csv](https://www.npmjs.com/package/basic-csv): From the docs, it states that it only transforms CSVs into an array of arrays, so it can't even match the format that the other CSV parsers output. Also, the fact that it uses a callback API, rather than a stream means I need to load the whole file into memory at once, which is idiotic. Also, it doesn't seem to accept anything other than a file, which means it's useless for data coming from a server or another process.
- [magic-csv](https://www.npmjs.com/package/magic-csv): Exposes a partly stream-based API, but internally it's all callback-based and requires the whole file to be loaded into memory. Also, it doesn't seem to accept a stream as an input.
- [csv-array](https://www.npmjs.com/package/csv-array): Uses streams internally, but only has a callback API. Also, it doesn't seem to accept anything other than a file as an input, which means it's useless for data coming from or going to a server or another process.
- [dank-csv](https://www.npmjs.com/package/dank-csv): It uses a synchronous API, regexp-based parsing, and was last updated in 2013. Thankfully, nobody seems to be using it.
- [yi-csv](https://www.npmjs.com/package/yi-csv): It isn't a streaming API - it just reads the file asynchronously and then emits the parsed CSV in the `end` event. Thus, it doesn't support piping and needs to read the whole file into memory at once.
- [rfc-csv](https://www.npmjs.com/package/rfc-csv): Only outputs arrays of strings, not Objects with keys.
