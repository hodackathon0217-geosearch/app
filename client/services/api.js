const request = require('superagent');

function query(points) {
  return new Promise((resolve, reject) => {
    const query = {
      points: points.reduce((acc, item, index) => {
        acc[index] = item;
        return acc;
      }, {}),
    };
    request
      .get('/api/search')
      .query(query)
      .end(function(err, res) {
        if(err) {
          reject(err);
        } else if(res.body.error) {
          let reason;
          try {
            reason = res.body.error.error.reason;
          } catch(e) {
            reason = 'unknown error occurred';
          }
          reject(new Error(reason));
        } else {
          resolve(res.body);
        }
      });
  });
}

module.exports = {
  query,
};
