import React from "react";
import Select from "react-select";
import axios from "axios";
import { PanelHeader } from "components";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import FacilityInfo from "../../components/FacilityInfo/FacilityInfo";
import Popup from "reactjs-popup";

// variables
const countyData = require('variables/counties_of_Kenya.json');
console.log(countyData.counties);
const baseURL = "http://api.kmhfltest.health.go.ke/api"
const keys = require('variables/keys.json')

class Facilities extends React.Component {
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
            facilityId: [],
            hidden: false
        };
    }

    componentDidMount() {
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

        // get facilities in sub county
        axios.get(`${baseURL}/facilities/facilities/?sub_county=${selectedSubCounty.value}&facility_services.category_id=${selectedService.value}&fields=code,official_name,id,sub_county_name,facility_type_parent,operation_status_name,number_of_beds,number_of_cots&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer ${keys.accessToken}`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    facilityName: `${response.official_name}`,
                    location: `${response.sub_county_name}`,
                    type: `${response.facility_type_parent}`,
                    status: `${response.operation_status_name}`,
                    info: <button onClick={this.submitfacilityId.bind(this, `${response.id}`)}>Details</button>

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
        axios.get(`${baseURL}/facilities/facilities/?ward=${selectedWard.value}&facility_services.category_id=${selectedService.value}&fields=official_name,id,ward_name,facility_type_parent,operation_status_name,number_of_beds,number_of_cots&format=json&page_size=100`, {
            headers: {
                Authorization: `Bearer ${keys.accessToken}`
            }
        }).then((response) => {
            const facilityData = response.data.results.map(response => {
                return ({
                    facilityName: `${response.official_name}`,
                    location: `${response.ward_name}`,
                    type: `${response.facility_type_parent}`,
                    status: `${response.operation_status_name}`,
                    info: <button onClick={this.submitfacilityId.bind(this, `${response.id}`)}>Details</button>
                        // <Popup
                        //     trigger={<button className="button" >Details</button>} modal>
                        //     <br/>
                        //     <br/>
                        //     <FacilityInfo facilityId={this.state.facilityId} />
                        // </Popup>
                })
            });
            console.log(facilityData);
            this.setState({ facilities: facilityData });
        }).catch((error) => {
            console.log(error);
        })
    }

    submitfacilityId(facilityId) {
        this.setState({
            facilityId: facilityId
        })
    }



    render() {
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
                                </CardHeader>
                                <CardBody>
                                    {/* search results table */}
                                    <ReactTable
                                        data={this.state.facilities}
                                        columns={[{
                                            Header: 'Facility Name',
                                            accessor: 'facilityName'
                                        }, {
                                            Header: 'Facility Type',
                                            accessor: 'type'

                                        }, {
                                            Header: 'Operation Status',
                                            accessor: 'status',
                                        }, {
                                            Header: 'More Info',
                                            accessor: 'info',
                                        }]}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div >
                <FacilityInfo facilityId={this.state.facilityId} />
            </div>
        );
    }
}

export default Facilities;