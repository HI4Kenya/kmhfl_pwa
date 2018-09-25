import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
// const fetchData = require("../../api");
const token = require('variables/keys.json');
const options = require('variables/counties_of_Kenya.json');
const baseURL = "http://api.kmhfltest.health.go.ke";
const FacilityEndPoint = "facilities/facilities";

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 29.5, lng: -95 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.lat_long[0], lng: marker.lat_long[1] }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.facility}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class FacilityMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      facilities: [],
      selectedMarker: false
  }
}
componentDidMount(){
     fetch(`${baseURL}/api/${FacilityEndPoint}/?fields=id,lat_long&format=json&limit=300`,{
     headers:
     { Authorization: `Bearer ${token.accessToken}` }})
   .then((response)=> {console.log(response);
    })
  }

handleClick = (marker, event) => {
    console.log({ marker })
    this.setState({ selectedMarker: marker })
}
render(){
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.facilities}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEffZ-EeQyeQswTAOusUBJZTyDFxfOzi0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
