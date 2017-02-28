'use strict';

const request = require('request-promise');
const exampleDocuments = require('./convertcsv.json');
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;
const extract = require('extract-zip')
const fs = require('fs');
const parse = require('csv-parse');

function readCSV() {
	return new Promise((resolve, reject) => {
		extract('/app/seed/data/crimeDataAggregated.csv.zip', {dir: '/app/seed/data/'}, function (err) {
			console.log('Creating CSV', err)
			fs.createReadStream('/app/seed/data/crimeDataAggregated.csv')
          .pipe(parse({delimiter: ','}))
          .on('data', function(csvrow) {
             createData(csvrow)
          })
          .on('end',function() {
            resolve();
          });
		})
	})
}


function deleteIndex() {
  console.log('Deleting index (and data)...');
  const opts = {
    method: 'DELETE',
    uri: `${ELASTICSEARCH_URL}/test`,
    json: true,
  };
  return request(opts)
    .catch(() => {});
}

function createData(row) {
  console.log('Creating data...' , row[0]);
  const record = {
  	Month: row[0],
  	"Reported by": row[3],
  	"Falls within": row[4],
  	"Location": row[5],
  	"LSOA code": row[6],
  	"LSOA name" : row[7],
  	"Crime type": row[8],
  	"Last outcome category":  row[9]
  }
  const lat = row[2] === 'NA' ? 0 : parseFloat(row[2])
  const lon = row[1] === 'NA' ? 0 : parseFloat(row[1])
  record.location = {
    lat : lat,
    lon : lon,
  };
  const opts = {
    method: 'POST',
    uri: `${ELASTICSEARCH_URL}/test/thetype`,
    json: true,
    body: record,
  };
  return request(opts);
}

function createMapping() {
  console.log('Create mapping for location...');
  const opts = {
    method: 'PUT',
    uri: 'http://elasticsearch:9200/test',
    json: true,
    body: {
      mappings: {
        thetype: {
          properties: {
            location: {
              type: 'geo_point',
            },
          },
        },
      },
    },
  };
  return request(opts);
}
deleteIndex()
	.then(createMapping)
	.then(readCSV)
  .then(() => console.log('Seeding done!'))
  .catch(err => console.log('ERROR!!', err));
