console.time('basic requires');
var fs = require('fs');
var JSONStream = require('JSONStream');
console.timeEnd('basic requires');

console.time('require lib');
var Converter = require('csvtojson').core.Converter;
console.timeEnd('require lib');

console.time('process csv');
var streamIn = fs.createReadStream('data/zipcode-database.csv');
var streamOut = fs.createWriteStream('tmp/csvtojson.json');
var csvStream = new Converter({
  checkType: false,
  trim: false,
  constructResult: false
});

var output = JSONStream.stringify('[', ',\n', ']\n');
csvStream.on('record_parsed', function(resultRow) {
  output.write(resultRow);
}).on('end', function () {
  output.end();
  console.timeEnd('process csv');
});

output.pipe(streamOut);
streamIn.pipe(csvStream);
