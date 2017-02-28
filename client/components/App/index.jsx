import React from 'react';

import Map from '../Map';
import api from '../../services/api';

const App = React.createClass({
  getInitialState: function() {
    return {results: []};
  },
  query: function(coords) {
    this.setState({loading: true});
    api.query(coords)
      .then(results => {
        this.setState({results, loading: false});
      });
  },
  render: function() {
    const loadingMessage = this.state.loading ? (<p>SIMULATED LOADING...</p>) : '';
    const resultsList = this.state.results.map((coord, i) => (
      <p key={i}>Lat: <b>{coord.lat}</b>, Lng: <b>{coord.lng}</b></p>
    ));
    return (
      <div>
        <Map
          onPolygonComplete={this.query}
        ></Map>
        {loadingMessage}
        {resultsList}
      </div>
    );
  },
});

export default App;
