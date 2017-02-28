import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import DrawingManager from '../DrawingManager';

const GoogleMapWrapper = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.500910, lng: -0.124636 }}
  >
    <DrawingManager
      onPolygonComplete={props.onPolygonComplete}
    ></DrawingManager>
  </GoogleMap>
)));

const Map = props => (
  <GoogleMapWrapper
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing"
    loadingElement={<h1>Loading</h1>}
    containerElement={<div style={{ height:600, width:800 }} />}
    mapElement={<div style={{ height:600, width:800 }} />}
    onPolygonComplete={props.onPolygonComplete}
  ></GoogleMapWrapper>
);

export default Map;
