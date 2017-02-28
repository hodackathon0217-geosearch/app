'use strict';

const request = require('request-promise');
const R = require('ramda');

const formatLocation = location => {
  return {
    lat: location.lat,
    lng: location.lon,
  };
};

function search(req, res) {
  const points = req.query.points.map(i => ({
    lat: i.lat,
    lon: i.lng,
  }));
  const opts = {
    method: 'GET',
    uri: 'http://localhost:9200/test/thetype/_search',
    json: true,
    body: {
    	"from" : 0, "size" : 1000,
      'query': {
        'bool' : {
          'must' : {
            'match_all' : {},
          },
          'filter' : {
            'geo_polygon' : {
              'location' : {
                'points' : points,
              },
            },
          },
        },
      },
    },
  };
  request(opts)
    .then(R.compose(
      x => res.json(x),
      R.map(
        R.over(
          R.lensProp('location'),
          formatLocation
        )
      ),
      R.map(R.prop('_source')),
      R.pathOr([], ['hits','hits'])
    ))
    .catch(e => {
      res.send(e);
    });
}

module.exports = {
  search,
};
