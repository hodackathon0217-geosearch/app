'use strict';

const request = require('request-promise');

const opts = {
	method: 'GET',
	uri: 'http://elasticsearch:9200/test',
	json: true,
	body: {
		"query": {
			"filtered" : {
					"query" : {
							"match_all" : {}
					},
					"filter" : {
							"geo_distance" : {
									"distance" : "20km",
									"location" : {
											"lat": 51.5286416,
										 "lon": -0.10159870000006777
									}
							}
					}
			}
		}
	}
};
request(opts)