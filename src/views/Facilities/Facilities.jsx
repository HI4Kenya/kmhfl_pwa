import React from "react";
import Select from "react-select";
import 'react-dropdown/style.css';
import axios from "axios";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import { PanelHeader } from "components";
// const fetchData = require("../../api");
const token = require('variables/keys.json');


const options = require('variables/counties_of_Kenya.json');
const baseURL = "http://api.kmhfltest.health.go.ke";
const subCountyEndPoint = "common/sub_counties";


class Facilities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countyOptions: null,
            subCountyOptions: [],
            wardOptions: [],
            serviceOptions: []
        }
    }

    componentDidMount() {
        //get  subcounty options
        axios.get(`${baseURL}/api/${subCountyEndPoint}/?fields=name,code&format=json&page_size=300`, {
            headers:
                { Authorization: `Bearer ${token.accessToken}` }
        }).then((response) => {
            const subCountyOptions = response.data.results.map(response => {
                return ({
                    label: `${response.name}`,
                    value: parseInt(`${response.code}`, 10)
                })
            });
            console.log(subCountyOptions);
            this.setState({ subCountyOptions });
        })
            .catch((error) => {
                console.log(error);
            })
        //get  ward options
        axios.get(`${baseURL}/api/common/wards/?fields=name,code&format=json&page_size=1600`, {
            headers:
                { Authorization: `Bearer ${token.accessToken}` }
        }).then((response) => {
            const wardOptions = response.data.results.map(response => {
                return ({
                    label: `${response.name}`,
                    value: parseInt(`${response.code}`, 10)
                })
            });
            console.log(wardOptions);
            this.setState({ wardOptions });
        })
            .catch((error) => {
                console.log(error);
            })
        //get services options
        axios.get(`${baseURL}/api/facilities/service_categories/?fields=name,id&format=json&page_size=100`, {
            headers:
                { Authorization: `Bearer ${token.accessToken}` }
        }).then((response) => {
            const serviceOptions = response.data.results.map(response => {
                return ({
                    label: `${response.name}`,
                    value: `${response.id}`
                })
            });
            console.log(serviceOptions);
            this.setState({ serviceOptions });
        })
            .catch((error) => {
                console.log(error);
            })
    }


    handleCountyChange = (countyOptions) => {
        this.setState({ countyOptions });
        console.log(`County selected:`, countyOptions);
    }
    handleSubCountyChange = (subCountyOptions) => {
        console.log(subCountyOptions);
        this.setState({ subCountyOptions });
        console.log(`Sub-County selected:`, subCountyOptions);
    }
    handleWardChange = (wardOptions) => {
        this.setState({ wardOptions });
        console.log(`Ward selected:`, wardOptions);
    }
    handleServiceChange = (serviceOptions) => {
        this.setState({ serviceOptions });
        console.log(`Ward selected:`, serviceOptions);
    }


    render() {
        const { countyOptions } = this.state;
        const { subCountyOptions } = this.state;
        const { wardOptions } = this.state;
        const { serviceOptions } = this.state;

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
                                            <Select
                                                value={countyOptions}
                                                onChange={this.handleCountyChange}
                                                options={options.counties}
                                                placeholder="Select County"
                                            />
                                        </Col>
                                        <p></p>
                                        <Col xs={12} md={3}>
                                            <Select
                                                onChange={this.handleSubCountyChange}
                                                options={subCountyOptions}
                                                placeholder="Select Sub-County"
                                            />
                                        </Col>
                                        <p></p>
                                        <Col xs={12} md={3}>
                                            <Select
                                                onChange={this.handleWardChange}
                                                options={wardOptions}
                                                placeholder="Select Ward"
                                            />
                                        </Col>
                                        <Col xs={12} md={3}>
                                            <Select
                                                onChange={this.handleServiceChange}
                                                options={serviceOptions}
                                                placeholder="Select Service"
                                            />
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Facility Name</th>
                                                <th>County</th>
                                                <th>KEPH Level</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>12345</td>
                                                <td>Kenyatta National Hospital</td>
                                                <td>Nairobi</td>
                                                <td>Level 6</td>
                                                {/* <td><button>Details</button></td> */}
                                            </tr>
                                            <tr>
                                                <td>67891</td>
                                                <td>Kisii General Hospital</td>
                                                <td>Kisii</td>
                                                <td>Level 5</td>
                                                {/* <td><button>Details</button></td> */}
                                            </tr>
                                            <tr>
                                                <td>54321</td>
                                                <td>Machakos District Hospital</td>
                                                <td>Machakos</td>
                                                <td>Level 5</td>
                                                {/* <td><button>Details</button></td> */}
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <ul>
                                    </ul>
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