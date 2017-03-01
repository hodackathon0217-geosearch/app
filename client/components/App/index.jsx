import React from 'react';
// material-ui setup
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import Map from '../Map';
import ResultsList from '../ResultsList';
import api from '../../services/api';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const App = React.createClass({
  getInitialState: function() {
    return {};
  },
  query: function(coords) {
    this.setState({loading: true});
    api.query(coords)
      .then(results => {
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="Geo Search" />
          <Map onPolygonComplete={this.query} markers={this.state.results}></Map>
          {resultsContent}
        </div>
      </MuiThemeProvider>
    );
  },
});

export default App;
