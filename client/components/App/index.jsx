import React from 'react';

import Map from '../Map';
import ResultsList from '../ResultsList';
import api from '../../services/api';

const App = React.createClass({
  getInitialState: function() {
    return {};
  },
  query: function(coords) {
    this.setState({loading: true});
    api.query(coords)
      .then(results => {
        results.forEach(res => {
          res.lat = res.location.lat;
          res.lng = res.location.lng;
        });
        this.setState({
          results,
          loading: false});
      })
      .catch(err => {
        alert(`Whoops! Error occured getting results. ${err.message}`);
      });
  },
  render: function() {
    let resultsContent;
    if(this.state.loading) {
      resultsContent = <p>Loading Results...</p>;
    } else if(this.state.results) {
      resultsContent = (<ResultsList items={this.state.results}></ResultsList>);
    }
    return (
      <div>
        <Map onPolygonComplete={this.query} markers={this.state.results}></Map>
        {resultsContent}
      </div>
    );
  },
});

export default App;
