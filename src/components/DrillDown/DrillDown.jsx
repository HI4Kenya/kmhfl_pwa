import React from 'react';
import Select from "react-select";
import axios from "axios";
import { Row, Col, CardBody } from "reactstrap";
import GoogleMaps from "simple-react-google-maps"


// variables
const keys = require('variables/keys.json');
const countyData = require('variables/counties_of_Kenya.json');
console.log(countyData.counties);
const baseURL = "http://api.kmhfltest.health.go.ke/api"


class DrillDown extends React.Component {
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
            facilities: [],
            test: [-1.273496, 36.806646]
        };
    }

    componentDidMount() {
        //get service options
        axios.get(`${baseURL}/facilities/service_categories/?fields=name,id&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer nO9Gp6NcqUViUPgpXOOYF1yS9N6vUV`
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
                Authorization: `Bearer nO9Gp6NcqUViUPgpXOOYF1yS9N6vUV`
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
                Authorization: `Bearer nO9Gp6NcqUViUPgpXOOYF1yS9N6vUV`
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

        // get facilities in sub county
        axios.get(`${baseURL}/facilities/facilities/?sub_county=${selectedSubCounty.value}&facility_services.category=${selectedService.value}&fields=lat_long&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer nO9Gp6NcqUViUPgpXOOYF1yS9N6vUV`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    lat_long: response.lat_long,
                })
            });
            console.log(facilityData);
            this.setState({ facilities: facilityData });
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
        axios.get(`${baseURL}/facilities/facilities/?ward=${selectedWard.value}&facility_services.category=${selectedService.value}&fields=lat_long&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer nO9Gp6NcqUViUPgpXOOYF1yS9N6vUV`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    lat_long: response.lat_long,
                })
            });
            console.log(facilityData);
            this.setState({ facilities: facilityData });
            console.log(this.state.facilities);
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        const { selectedCounty } = this.state;
        const { selectedSubCounty } = this.state;
        const { subCountyOptions } = this.state;
        const { selectedWard } = this.state;
        const { wardOptions } = this.state;
        const { selectedService } = this.state;
        const { serviceOptions } = this.state;
        const { facilities } = this.state;
        const { test } = this.state;

        return (
            <div>
                <Row>
                    <Col xs={12} md={3}>
                        {/* service options dropdown */}
                        <Select
                            value={selectedService}
                            options={serviceOptions}
                            onChange={this.handleServiceChange}
                            placeholder="Service"
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        {/* county options dropdown */}
                        <Select
                            value={selectedCounty}
                            options={countyData.counties}
                            onChange={this.handleCountyChange}
                            placeholder="County"
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        {/* sub county options dropdown */}
                        <Select
                            value={selectedSubCounty}
                            options={subCountyOptions}
                            onChange={this.handleSubCountyChange}
                            placeholder="Sub County"
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        {/* ward options dropdown */}
                        <Select
                            value={selectedWard}
                            options={wardOptions}
                            onChange={this.handleWardChange}
                            placeholder="Ward"
                        />
                    </Col>
                </Row>
                <label>{subCountyOptions.label}</label>
                <CardBody>
                    <GoogleMaps
                        apiKey={keys.mapKey}
                        style={{ height: "500px", width: "100%" }}
                        zoom={11}
                        center={{ lat: -1.273496, lng: 36.806646 }}
                        // markers = {{}}                        
                        markers={{ lat: test[0], lng: test[1] }} //optional

                    />
                </CardBody>
            </div>
        )
    }
}

export default DrillDown;