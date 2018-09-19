import React from "react";
import Select from "react-select";
import axios from "axios";
import { PanelHeader } from "components";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import ReactTable from "react-table";
import 'react-table/react-table.css';

// variables
const countyData = require('variables/counties_of_Kenya.json');
console.log(countyData.counties);
const baseURL = "http://api.kmhfltest.health.go.ke/api"

class Facilities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCounty: undefined,
            selectedSubCounty: undefined,
            selectedWard: undefined,
            selectedService: undefined,
            subCountyOptions: [],
            wardOptions: [],
            serviceOptions: [],
            facilities: []
        };
    }

    componentDidMount() {
        //get sub county options

        //get ward options

        //get service options
    }

    handleCountyChange = (selectedCounty) => {
        this.setState({
            selectedCounty
        });
        console.log(`County selected:`, selectedCounty);

        // get sub counties in selected county
        axios.get(`${baseURL}/common/sub_counties/?county=${selectedCounty.value}&fields=name,id,code&format=json&page_size=300`, {
            headers: {
                Authorization: `Bearer 3SInl9x9QjncfXWbom7XnOuOZwwHhz`
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
        console.log(`Sub County selected:`, selectedSubCounty);

        // get wards in selected sub county
        axios.get(`${baseURL}/common/wards/?sub_county=${selectedSubCounty.value}&fields=name,id,code&format=json&page_size=300`, {
            headers: {
                Authorization: `Bearer 3SInl9x9QjncfXWbom7XnOuOZwwHhz`
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
        axios.get(`${baseURL}/facilities/facilities/?sub_county=${selectedSubCounty.value}&fields=official_name,sub_county_name,facility_type_name&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer 3SInl9x9QjncfXWbom7XnOuOZwwHhz`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    facilityName: `${response.official_name}`,
                    location: `${response.sub_county_name}`,
                    type: `${response.facility_type_name}`
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
        console.log(`Ward selected:`, selectedWard);

        // get facilities in ward
        axios.get(`${baseURL}/facilities/facilities/?ward=${selectedWard.value}&fields=official_name,ward_name,facility_type_name&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer 3SInl9x9QjncfXWbom7XnOuOZwwHhz`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    facilityName: `${response.official_name}`,
                    location: `${response.ward_name}`,
                    type: `${response.facility_type_name}`
                })
            });
            console.log(facilityData);
            this.setState({ facilities: facilityData });
        }).catch((error) => {
            console.log(error);
        })
    }

    handleServiceChange = (selectedService) => {
        this.setState({
            selectedService
        });
        console.log(`Service selected:`, selectedService);

        // get services
        axios.get(`${baseURL}/facilities/facilities/?ward=${selectedService.value}&fields=official_name,ward_name,facility_type_name&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer 3SInl9x9QjncfXWbom7XnOuOZwwHhz`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    facilityName: `${response.official_name}`,
                    location: `${response.ward_name}`,
                    type: `${response.facility_type_name}`
                })
            });
            console.log(facilityData);
            this.setState({ facilities: facilityData });
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

        return (
            <div>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Registered Facilities</CardTitle>
                                    <Row>
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
                                        <Col xs={12} md={3}>
                                            {/* service options dropdown */}
                                            <Select
                                                value={selectedService}
                                                options={serviceOptions}
                                                onChange={this.handleServiceChange}
                                                placeholder="Service"
                                            />
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {/* search results table */}
                                    <ReactTable
                                        data={facilities}
                                        columns={[{
                                            Header: 'Facility Name',
                                            accessor: 'facilityName' // String-based value accessors!
                                        }, {
                                            Header: 'Location',
                                            accessor: 'location',
                                        }, {
                                            Header: 'Type',
                                            accessor: 'type'
                                        }
                                        ]}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Facilities;