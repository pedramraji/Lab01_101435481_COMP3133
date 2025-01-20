const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';
const inputFile = 'input_countries.csv';

if (fs.existsSync(canadaFile)) {
  fs.unlinkSync(canadaFile);
}
if (fs.existsSync(usaFile)) {
  fs.unlinkSync(usaFile);
}

const canadaData = [];
const usaData = [];


fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if (row.country.toLowerCase() === 'canada') {
      canadaData.push(row);
    } else if (row.country.toLowerCase() === 'united states') {
      usaData.push(row);
    }
  })
  .on('end', () => {

    fs.appendFileSync(canadaFile, 'country,year,population\n');
    canadaData.forEach((row) => {
      fs.appendFileSync(canadaFile, `${row.country},${row.year},${row.population}\n`);
    });


    fs.appendFileSync(usaFile, 'country,year,population\n');
    usaData.forEach((row) => {
      fs.appendFileSync(usaFile, `${row.country},${row.year},${row.population}\n`);
    });

    console.log('Data has been written to canada.txt and usa.txt');
  });
