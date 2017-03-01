import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import MapMarker from '../MapMarker';
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
      <MapMarker
        key={i}
        lat={marker.lat}
        lng={marker.lng}
        infoContent={(
          <div>
            <p>{marker['Month']} {marker['Falls within']}</p>
            <p>{marker['Crime type']}</p>
            <p>{marker['Last outcome category']}</p>
          </div>
        )}
      >
      </MapMarker>
    ))}
  </GoogleMap>
)));

const Map = props => (
  <GoogleMapWrapper
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing"
    loadingElement={<h1>Loading</h1>}
    containerElement={<div style={{height: 600, width:'100%'}} />}
    mapElement={<div style={{height: 600, width:'100%'}} />}
    onPolygonComplete={props.onPolygonComplete}
    markers={props.markers || []}
  ></GoogleMapWrapper>
);

export default Map;
