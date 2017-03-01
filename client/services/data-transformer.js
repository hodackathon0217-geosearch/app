const lookupReducer = (a, x) => {
  a[x.key] = x.value;
  return a;
};

const crimeLookup = require('../mocks/crime.json').reduce(lookupReducer, {});
const fallsLookup = require('../mocks/falls.json').reduce(lookupReducer, {});
const outcomeLookup = require('../mocks/outcome.json').reduce(lookupReducer, {});
const reportedLookup = require('../mocks/reported.json').reduce(lookupReducer, {});

function transform(item) {
  return Object.assign({}, item, {
    'Crime type': crimeLookup[item['Crime type']],
    'Falls within': fallsLookup[item['Falls within']],
    'Reported by': reportedLookup[item['Reported by']],
    'Last outcome category': outcomeLookup[item['Last outcome category']],
    'lat': parseFloat(item.location.lat),
    'lng': parseFloat(item.location.lng),
  });
}

module.exports = {
  transform,
};
