import React from "react";
import Select from "react-select";
import axios from 'axios';
import CustomButton from "components";
// import SelectSearch from "react-select-search";
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import { PanelHeader } from "components";
const token = require('variables/keys.json');

// import { thead, tbody } from "variables/general";
// import accessToken from "variables/general";
// const axios = require('axios');
const options = require('variables/counties_of_Kenya.json');
// const defaultOption = county_options.counties[47];
// console.log(county_options.counties[47]);  


// const options = [
//     'one', 'two', 'three'
// ];



class Facilities extends React.Component {
    state = {
        countyOptions: null,
        subCountyOptions: [],
        wardOptions: null,
        // subcounties: [],
    }
    //GET request used to fetch subcounties from MFL
    componentDidMount() {
        console.log(token.accessToken);
        axios.get(`http://api.kmhfltest.health.go.ke/api/common/sub_counties/?fields=name,code&format=json&paging=false`, {
            headers:
                { "Authorization": `Bearer ${token.accessToken}` }
        })
            .then((response) => {
                const subCountyOptions = response.data.results.map(response => {
                    return ({
                        label: `${response.name}`,
                        value: parseInt(`${response.code}`, 10)
                    })
                });
                this.setState({ subCountyOptions });
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://api.kmhfltest.health.go.ke/api/common/wards/?fields=name,code&format=json&paging=false`, {
            headers:
                { "Authorization": `Bearer ${token.accessToken}` }
        })
            .then((response) => {
                const wardOptions = response.data.results.map(response => {
                    return ({
                        label: `${response.name}`,
                        value: parseInt(`${response.code}`, 10)
                    })
                });
                console.log(wardOptions);
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
    render() {
        const { countyOptions } = this.state;
        const { subCountyOptions } = this.state;
        console.log(subCountyOptions);
        const { wardOptions } = this.state;

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
                                                value={wardOptions}
                                                onChange={this.handleWardChange}
                                                options={options.wards_nairobi}
                                                placeholder="Select Ward"
                                            />
                                        </Col>
                                        <Col xs={12} md={3}>
                                            <button>More filters</button>
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