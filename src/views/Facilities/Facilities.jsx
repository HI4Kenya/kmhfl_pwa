import React from "react";
import Select from "react-select";
// import SelectSearch from "react-select-search";
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col} from "reactstrap";
import { PanelHeader } from "components";
import { thead, tbody } from "variables/general";
// const axios = require('axios');
const county_options = require('variables/counties_of_Kenya.json');
// const defaultOption = county_options.counties[47];
// console.log(county_options.counties[47]);  


// const options = [
//     'one', 'two', 'three'
// ];



class Facilities extends React.Component {
    state = {
        countyOption: null,
        subCountyOption: null,
        wardOption: null,
    }
    handleCountyChange = (countyOption) => {
        this.setState({ countyOption});
        console.log(`County selected:`, countyOption);
    }
    handleSubCountyChange = (subCountyOption) => {
        this.setState({ subCountyOption });
        console.log(`Sub-County selected:`, subCountyOption);
    }
    handleWardChange = (wardOption) => {
        this.setState({ wardOption });
        console.log(`Ward selected:`, wardOption);
    }
    render() {
        const { countyOption } = this.state;
        const { subCountyOption } = this.state;
        const { wardOption } = this.state;

        return (
            <div>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Registered Facilities</CardTitle>
                                        <Col xs={12}>
                                            <Select
                                                value={countyOption}
                                                onChange={this.handleCountyChange}
                                                options={county_options.counties}
                                                placeholder="county"
                                            />
                                        </Col>
                                        <p></p>
                                        <Col xs={12}>
                                            <Select
                                                value={subCountyOption}
                                                onChange={this.handleSubCountyChange}
                                                options={county_options.subcounties_nairobi}
                                                placeholder="Sub-County"
                                            />
                                        </Col>
                                        <p></p>
                                        <Col xs={12}>
                                            <Select
                                                value={wardOption}
                                                onChange={this.handleWardChange}
                                                options={county_options.wards_nairobi}
                                                placeholder="Ward"
                                            />
                                        </Col>
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
                                                <td>Level 6</td>
                                                <td><button>Details</button></td>
                                            </tr>
                                            <tr>
                                                <td>67891</td>
                                                <td>Kisii General Hospital</td>
                                                <td>Level 5</td>
                                                <td><button>Details</button></td>
                                            </tr>
                                            <tr>
                                                <td>54321</td>
                                                <td>Machakos District Hospital</td>
                                                <td>Level 4</td>
                                                <td><button>Details</button></td>
                                            </tr>
                                        </tbody>
                                    </Table>
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