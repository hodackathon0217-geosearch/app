/* global google */
import React from 'react';
import GoogleDrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

const DrawingManager = React.createClass({
  onPolygonComplete: function(polygon) {
    const coordinates = polygon.getPath()
      .getArray()
      .map(point => {
        return {
          lat: point.lat(),
          lng: point.lng(),
        };
      });
    if(this.props.onPolygonComplete) {
      this.props.onPolygonComplete(coordinates);
    }
  },
  render: function() {
    const polygonDrawingMode = google.maps.drawing.OverlayType.POLYGON;
    return (
      <GoogleDrawingManager
        defaultDrawingMode={polygonDrawingMode}
        onPolygonComplete={this.onPolygonComplete}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              polygonDrawingMode,
            ],
          },
        }}
      ></GoogleDrawingManager>
    );
  },
});

export default DrawingManager;
