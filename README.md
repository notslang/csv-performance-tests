# CSV Performance Tests
There are a bunch of CSV parsers, so this is an attempt to compare them. You can run the tests using `npm test`

These tests only cover streaming CSV parsers because if you're looking at non-streaming parsers then you don't care about performance.

Also, we don't care about type conversion or other features like that because they don't belong in the core of a CSV parser. We've disabled type conversion to make the playing field as level as possible, but it's probably not perfect.

## Results
Here's what I get from running this on my own machine:

package                                             | time (lower is better)
--------------------------------------------------- | ----------------------
[csv-parser](https://npmjs.com/package/csv-parser) | 6.201s
[csv-stream](https://npmjs.com/package/csv-stream) | 8.218s
[csv-parse](https://npmjs.com/package/csv-parse)    | 9.778s
[fast-csv](https://npmjs.com/package/fast-csv)     | 10.484s
[csvtojson](https://npmjs.com/package/csvtojson)   | 13.120s
[binary-csv](https://npmjs.com/package/binary-csv) | 13.832s

raw output:

```
# binary-csv
basic requires: 4ms
require lib: 13ms
process csv: 13711ms

real	0m13.832s
user	0m12.212s
sys	0m2.620s

# csv-parse
basic requires: 4ms
require lib: 1ms
process csv: 9668ms

real	0m9.778s
user	0m7.884s
sys	0m2.744s

# csv-parser
basic requires: 4ms
require lib: 4ms
process csv: 6091ms

real	0m6.201s
user	0m4.192s
sys	0m2.832s

# csv-stream
basic requires: 4ms
require lib: 2ms
process csv: 8111ms

real	0m8.218s
user	0m6.480s
sys	0m2.484s

# csvtojson
basic requires: 4ms
require lib: 17ms
process csv: 9082ms

real	0m13.120s
user	0m11.284s
sys	0m2.732s

# fast-csv
basic requires: 4ms
require lib: 50ms
process csv: 10330ms

real	0m10.484s
user	0m8.828s
sys	0m2.664s

sha sums to ensure all the resulting files are the same:
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/binary-csv.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csv-parse.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csv-parser.json
e866e9e2eaa523fa7020d7aa7f205a57402aa631  tmp/csv-stream.json
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
