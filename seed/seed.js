'use strict';

const request = require('request-promise');
const exampleDocuments = require('./convertcsv.json');
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;

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
  console.log('Creating data...' , row['Crime ID']);
  row.location = {
    lat : row.Latitude,
    lon : row.Longitude,
  };
  delete row.Latitude;
  delete row.Longitude;
  const opts = {
    method: 'POST',
    uri: `${ELASTICSEARCH_URL}/test/thetype`,
    json: true,
    body: row,
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
	.then(() => Promise.all(exampleDocuments.map(createData)))
  .then(() => console.log('Seeding done!'))
  .catch(err => console.log('ERROR!!', err));
