import React from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Select from "react-select";
import axios from "axios";
// import pkgInfo from '../../package.json';
// import Fork from 'react-ghfork';



// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { PanelHeader} from "components";
import FetchLocation from "../../components/FetchLocation/FetchLocation";
import { PanelHeader} from "components";
const keys = require('variables/keys.json');
const baseURL = "http://api.kmhfltest.health.go.ke/api";


const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: -1.273496, lng: 36.806646 }}
      defaultOptions={{
        scrollwheel: false,
        styles: [
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
      }}
    >
      <Marker position={{ lat: -1.273496, lng: 36.806646 }} />
    </GoogleMap>
  ))
);

class FullScreenMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: undefined,
      serviceOptions: [],
      facilities: []
    };
    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  innerRef;
  getInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
  }

  

  handleServiceChange = (selectedService) => {
    this.setState({
      selectedService
    });
    console.log(`Service selected:`, selectedService);
  }

  
  render() {
    const { selectedService } = this.state;
    const { serviceOptions } = this.state;
    const { getInnerRef, getLocation } = this.state;
    const { facilities } = this.state;

    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Find Facility Location</CardTitle>
                  <DrillDown/>
                </CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <MapWrapper
                      googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + keys.mapKey}
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

export default FullScreenMap;
