console.time('basic requires');
var fs = require('fs');
var JSONStream = require('JSONStream');
console.timeEnd('basic requires');

console.time('require lib');
var csv = require('csv-parse');
console.timeEnd('require lib');

console.time('process csv');
var streamIn = fs.createReadStream('data/zipcode-database.csv');
var streamOut = fs.createWriteStream('tmp/csv-parse.json');
var csvStream = csv({columns: true});

csvStream.on('end', function () {
  console.timeEnd('process csv');
});

streamIn
  .pipe(csvStream)
  .pipe(JSONStream.stringify('[', ',\n', ']\n'))
  .pipe(streamOut);
