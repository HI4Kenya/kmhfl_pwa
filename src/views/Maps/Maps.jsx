import React from "react";
import axios from "axios";
import {default as Component} from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
// import Geocode from "react-geocode";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { PanelHeader } from "components";
var map;
var geocoder;

// const fetchData = require("../../api");
const token = require('variables/keys.json');
const options = require('variables/counties_of_Kenya.json');
const baseURL = "http://api.kmhfltest.health.go.ke";
const FacilityEndPoint = "facilities/facilities";
const MapWrapper = withScriptjs(
  withGoogleMap(props => (
      <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={13}
      defaultCenter={{ lat: 0.748817, lng: -33.985428 }}
      defaultOptions={{
        scrollwheel: false,
      styles:fancy}}
    >
      {props.markers.map((marker,index)=>
    <Marker
    position={marker.position}
    onClick={()=> props.onMarkerClick(marker)}
    >
    {marker.showInfo &&(
     <infoWindow onCloseClick={()=> props.onMarkerClose(marker)}>
     {
       marker.content
     } 
     </infoWindow>
     ) }
     </Marker>
  )}}   
   </GoogleMap>
  ))
);
export default class FullScreenMap extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            markers: [],
            formValue:"",
            isReady:false,  //create isReady on the state
        }
       /* this.handleMapClick=this.handleMapClick.bind(this);*/
        this.handleMarkerClick=this.handleMarkerClick.bind(this);
        this.handleMarkerClose=this.handleMarkerClose.bind(this);
        this.handleChange=this.handleChange.bind(this);  
             

    }

    componentDidMount() {
      //get  facilities options
      axios.get(`${baseURL}/api/${FacilityEndPoint}/?fields=id,lat_long&format=json&page_size=5`, {
          headers:
              { Authorization: `Bearer ${token.accessToken}` }
      }).then(response=> {
        const markerData= response.data.results;
        console.log("results",response.data)
        
        const nextMarkers= markerData.map(markerData=>{
          const latlng={lat:Number(markerData.lat_long[0]),lng:Number(markerData.lat_long[1])}
          return{
            id:markerData.id,
            position:latlng
          }
        })
        this.setState({
          markers:nextMarkers
        })

        })
      }
     

    handleChange(event){
      this.setState({formValue:event.target.value})
    }

    handleMarkerRightClick(targetMarker){
      const nextMarkers=this.state.markers.filter(marker => marker !==targetMarker);
      this.setState({
        markers:nextMarkers,
      }); 
    }
    handleMarkerClick(targetMarker){
      this.setState({
        markers:this.state.markers.map(marker =>{
          if (marker===targetMarker) marker.showInfo= true
            console.log(marker)
            return marker;
           }),
        })
       }

    handleMarkerClose(targetMarker){
      this.setState({
        markers:this.state.markers.map(marker =>{
          if(marker===targetMarker) marker.showInfo=false
          return marker;
        }),
      })
    }
  
        /*
         { console.log("success",response.data.results)
          var Facilities = response.data.results.map( function(res){
           return({
                id: res.id,
                lat:res.lat_long[0],
                long: res.lat_long[1]
            
          })});
          console.log("facilities",Facilities);
          this.setState({ facilities:Facilities[0]});
      })
          .catch((error) => {
              console.log(error);
          })
}
handleClick= (marker, event)=>{
    this.setState({selectedMarker:marker})
}}*/

render() {
 /*const {isReady}=this.state;
  if(isReady)*/
   return (
                <div>
                <PanelHeader size="sm" />
                <div className="content">
                  <Row>
                    <Col xs={12}>
                      <Card>
                        <CardHeader>Google Map</CardHeader>
                        <CardBody>
                          <div
                            id="map"
                            className="map"
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <MapWrapper
                              markers={this.state.markers}
                              onMapLoad={this.handleMapLoad}
                              onMapClick={this.handleMapClick}
                              onMarkerRightClick={this.handleMarkerRightClick}
                              onMarkerClick={this.handleMarkerClick}
                              onMarkerClose={this.handleMarkerClose}
                              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAh_B-XTyhwOalsCZIqWnagWt9teigisio"
                              loadingElement={<div style={{ height: `100%` }} />}
                              containerElement={<div style={{ height: `100%` }} />}
                              mapElement={<div style={{ height: `100%` }} />}
                            />
                          </div> 
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div> 
            );
            }
          }
          const fancy=[
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 18 }]
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 16 }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#dedede" }, { lightness: 21 }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                { visibility: "on" },
                { color: "#ffffff" },
                { lightness: 16 }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                { saturation: 36 },
                { color: "#333333" },
                { lightness: 40 }
              ]
            },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{ color: "#fefefe" }, { lightness: 20 }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
            }
        
          ]
        
  