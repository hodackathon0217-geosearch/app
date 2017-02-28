/* global google */
import React from 'react';
import GoogleDrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

const DrawingManager = React.createClass({
  getInitialState: function() {
    return {
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
  },
  onPolygonComplete: function(polygon) {
    this.setState({drawingMode: undefined});
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
    return (
      <GoogleDrawingManager
        drawingMode={this.state.drawingMode}
        onPolygonComplete={this.onPolygonComplete}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
            ],
          },
        }}
      ></GoogleDrawingManager>
    );
  },
});

export default DrawingManager;
