import React from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { PanelHeader } from "components";
import Select from "react-select";
import axios from "axios";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import { Button } from "components";
import FacilityInfo from "../../components/FacilityInfo/FacilityInfo";

// variables
const keys = require('variables/keys.json');
const countyData = require('variables/counties_of_Kenya.json');
const baseURL = "http://api.kmhfltest.health.go.ke/api"
const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + keys.mapKey;
const navigationURL = "https://www.google.com/maps/dir/?api=1&key";


class FullScreenMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCounty: "",
            selectedSubCounty: "",
            selectedWard: "",
            selectedService: "",
            subCountyOptions: [],
            wardOptions: [],
            serviceOptions: [],
            facilitiesGeolocation: [],
            facilities: [],
            lat: -1.2746752,
            lng: 36.809113599999996,
            name: "",
            isOpen: false,
        };
    }

    componentDidMount() {
        //get geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    console.log(this.state.lat)
                    console.log(this.state.lng)
                }
            )
        } else {
            (error) => { console.log(error) }
        }
        //get service options
        axios.get(`${baseURL}/facilities/service_categories/?fields=name,id&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer ${keys.accessToken}`
            }
        }).then((response) => {
            const serviceData = response.data.results.map(response => {
                return ({
                    label: `${response.name}`,
                    value: `${response.id}`,
                })
            });
            console.log(serviceData);
            this.setState({ serviceOptions: serviceData });
        }).catch((error) => {
            console.log(error);
        })
    }

    handleServiceChange = (selectedService) => {
        this.setState({
            selectedService
        });
        console.log(`Service selected:`, selectedService);
    }

    handleCountyChange = (selectedCounty) => {
        this.setState({
            selectedCounty
        });
        console.log(`County selected:`, selectedCounty);

        // get sub counties in selected county
        axios.get(`${baseURL}/common/sub_counties/?county=${selectedCounty.value}&fields=name,id,code&format=json&page_size=300`, {
            headers: {
                Authorization: `Bearer ${keys.accessToken}`
            }
        }).then((response) => {
            const options = response.data.results.map(response => {
                return ({
                    label: `${response.name}`,
                    value: `${response.id}`,
                    code: `${response.code}`
                })
            });
            console.log(options);
            this.setState({ subCountyOptions: options });
        }).catch((error) => {
            console.log(error);
        })
    }

    handleSubCountyChange = (selectedSubCounty) => {
        this.setState({
            selectedSubCounty
        });
        const selectedService = this.state.selectedService;
        console.log(selectedService);
        console.log(`Sub County selected:`, selectedSubCounty);


        // get wards in selected sub county
        axios.get(`${baseURL}/common/wards/?sub_county=${selectedSubCounty.value}&fields=name,id,code&format=json&page_size=300`, {
            headers: {
                Authorization: `Bearer ${keys.accessToken}`
            }
        }).then((response) => {
            const options = response.data.results.map(response => {
                return ({
                    label: `${response.name}`,
                    value: `${response.id}`,
                    code: `${response.code}`
                })
            });
            console.log(options);
            this.setState({ wardOptions: options });
        }).catch((error) => {
            console.log(error);
        })
    }

    handleWardChange = (selectedWard) => {
        this.setState({
            selectedWard
        });
        const selectedService = this.state.selectedService;
        console.log(selectedService);
        console.log(`Ward selected:`, selectedWard);


        // get facilities in ward
        axios.get(`${baseURL}/facilities/facilities/?ward=${selectedWard.value}&facility_services.category_id=${selectedService.value}&fields=lat_long,official_name,id&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer ${keys.accessToken}`
            }
        }).then((response) => {
            const facilityData = response.data.results;
            const facilitiesGeolocation = facilityData.map(marker => {
                const markerData = { lat: Number(marker.lat_long[0]), lng: Number(marker.lat_long[1]) }
                return {
                    id: marker.id,
                    name: marker.official_name,
                    position: markerData,
                    lat: marker.lat_long[0],
                    long: marker.lat_long[1]
                }
            })
            this.setState({
                facilitiesGeolocation: facilitiesGeolocation
            })
            console.log(facilityData)
            console.log(this.state.facilitiesGeolocation);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleNavigate(lat, long) {
        let googleMapsRedirect = `${navigationURL}=${keys.apiKey}&destination=${lat},${long}`
        window.open(googleMapsRedirect);
    }

    handleToggleOpen() {
        this.setState({
            isOpen: true
        });
    }

    handleToggleClose() {
        this.setState({
            isOpen: false
        });
    }

    submitfacilityId(facilityId) {
        this.setState({
            facilityId: facilityId,
            showFacilityDetail: true,
            // showFacilitySearch: false
        })
    }

    MapWrapper = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={13}
                defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
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
                {props.facilitiesGeolocation.map((facilitiesGeolocation) =>
                    <Marker
                        key={facilitiesGeolocation.id}
                        position={facilitiesGeolocation.position}
                        onClick={() => props.onMarkerClick()}
                    >
                        {this.state.isOpen &&
                            <InfoWindow onCloseClick={() => props.onCloseClick()}>
                                <div>
                                    <span className="title">{facilitiesGeolocation.name}</span>
                                    <br />
                                    <Button className="btn-wd" onClick={this.submitfacilityId.bind(this, `${facilitiesGeolocation.id}`)} >Details</Button>
                                    <Button className="btn-wd" onClick={() => props.onNavigateClick(facilitiesGeolocation.lat, facilitiesGeolocation.long)}>Navigate</Button>
                                    
                                </div>
                            </InfoWindow>
                                }
                    </Marker>
                )}}
   </GoogleMap>
                ))
                );
            
            
    render() {
        return (
            <div>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Facility Locator</CardTitle>
                                        <div>
                                            <Row>
                                                <Col xs={12} md={3}>
                                                    {/* service options dropdown */}
                                                    <Select
                                                        value={this.state.selectedService}
                                                        options={this.state.serviceOptions}
                                                        onChange={this.handleServiceChange}
                                                        placeholder="Service"
                                                    />
                                                </Col>
                                                <Col xs={12} md={3}>
                                                    {/* county options dropdown */}
                                                    <Select
                                                        value={this.state.selectedCounty}
                                                        options={countyData.counties}
                                                        onChange={this.handleCountyChange}
                                                        placeholder="County"
                                                    />
                                                </Col>
                                                <Col xs={12} md={3}>
                                                    {/* sub county options dropdown */}
                                                    <Select
                                                        value={this.state.selectedSubCounty}
                                                        options={this.state.subCountyOptions}
                                                        onChange={this.handleSubCountyChange}
                                                        placeholder="Sub County"
                                                    />
                                                </Col>
                                                <Col xs={12} md={3}>
                                                    {/* ward options dropdown */}
                                                    <Select
                                                        value={this.state.selectedWard}
                                                        options={this.state.wardOptions}
                                                        onChange={this.handleWardChange}
                                                        placeholder="Ward"
                                                    />
                                                </Col>
                                            </Row>
                                            <label>{this.state.subCountyOptions.label}</label>
                                            <CardBody>
                                                <div
                                                    id="map"
                                                    className="map"
                                                    style={{ position: "relative", overflow: "hidden" }}
                                                >
                                                    <this.MapWrapper
                                                        facilitiesGeolocation={this.state.facilitiesGeolocation}
                                                        onMarkerClick={this.handleToggleOpen.bind(this)}
                                                        onNavigateClick={this.handleNavigate.bind(this)}
                                                        onCloseClick={this.handleToggleClose.bind(this)}
                                                        googleMapURL={googleMapURL}
                                                        loadingElement={<div style={{ height: `100%` }} />}
                                                        containerElement={<div style={{ height: `100%` }} />}
                                                        mapElement={<div style={{ height: `100%` }} />}
                                                    />
                                                </div>
                                            </CardBody>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    {this.state.showFacilityDetail && <FacilityInfo facilityId={this.state.facilityId} />}

                </div>

                );
            }
        }
        
        export default FullScreenMap;