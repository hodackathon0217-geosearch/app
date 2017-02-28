import React from 'react';

import Marker from 'react-google-maps/lib/Marker';
import InfoWindow from 'react-google-maps/lib/InfoWindow';

const markers = [];
const closeAllInfoWindow = () => {
  markers.forEach(marker => marker.closeInfoWindow());
};

const MapMarker = React.createClass({
  componentWillMount: function() {
    markers.push(this);
  },
  componentWillUnmount: function() {
    markers.splice(markers.indexOf(this), 1);
  },
  getInitialState: function() {
    return {};
  },
  openInfoWindow: function() {
    closeAllInfoWindow();
    this.setState({showInfo: true});
  },
  closeInfoWindow: function() {
    this.setState({showInfo: false});
  },
  render: function() {
    return (
      <Marker
       position={{lat: this.props.lat, lng: this.props.lng}}
       onClick={() => this.openInfoWindow()}
      >
       {this.state.showInfo && (
         <InfoWindow onCloseClick={() => this.closeInfoWindow()}>
           {this.props.infoContent}
         </InfoWindow>
       )}
     </Marker>
    );
  },
});

export default MapMarker;
