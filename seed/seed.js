'use strict';

const request = require('request-promise');

// Index auto created automatically
// function createIndex() {
//   console.log('Creating index...');
//   const opts = {
//     method: 'PUT',
//     uri: 'http://elasticsearch:9200/test',
//     json: true,
//     body: {
//       'mappings' : {
//         'thetype' : {
//           'properties' : {
//             'message' : {
//               'type': 'text',
//             },
//           },
//         },
//       },
//     },
//   };
//   return request(opts);
// }

function deleteIndex() {
  console.log('Deleting index (and data)...');
  const opts = {
    method: 'DELETE',
    uri: 'http://elasticsearch:9200/test',
    json: true,
  };
  return request(opts);
}

function createData() {
  console.log('Creating data...');
  const opts = {
    method: 'POST',
    uri: 'http://elasticsearch:9200/test/thetype',
    json: true,
    body: {
      message: 'Message saved in elastic!',
    },
  };
  return request(opts);
}

deleteIndex()
  .then(createData)
  .then(() => console.log('Seeding done!'))
  .catch(err => console.log('ERROR!!', err));
