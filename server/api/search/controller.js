'use strict';

const request = require('request-promise');

function search(req, res) {
	const points = req.query.points.map(i => ({
		lat: parseInt(i.lat),
		lon: parseInt(i.lon)
	}));
	const opts = {
  	method: 'GET',
  	uri: 'http://localhost:9200/test/thetype/_search',
  	json: true,
  	body: {
				"query": {
						"bool" : {
								"must" : {
										"match_all" : {}
								},
								"filter" : {
										"geo_polygon" : {
												"location" : {
														"points" : points
												}
										}
								}
						}
				}
		}
  };
  request(opts)
  	.then(r => {
  	  res.json(r.hits.hits);
  	})
  	.catch(e => {
  	  res.send(e);
  	})
}

module.exports = {
  search,
};
