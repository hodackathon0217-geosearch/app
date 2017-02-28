import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import Marker from 'react-google-maps/lib/Marker';
import DrawingManager from '../DrawingManager';

const GoogleMapWrapper = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: 51.632971, lng: -2.107042 }}
  >
    <DrawingManager
      onPolygonComplete={props.onPolygonComplete}
    ></DrawingManager>
    {props.markers.map((marker, i) => (
      <Marker key={i} position={marker}></Marker>
    ))}
  </GoogleMap>
)));

const Map = props => (
  <GoogleMapWrapper
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing"
    loadingElement={<h1>Loading</h1>}
    containerElement={<div style={{ height:600, width:800 }} />}
    mapElement={<div style={{ height:600, width:800 }} />}
    onPolygonComplete={props.onPolygonComplete}
    markers={props.markers || []}
  ></GoogleMapWrapper>
);

export default Map;
