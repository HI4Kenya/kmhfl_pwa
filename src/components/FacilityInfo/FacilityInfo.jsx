import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import ReactTable from "react-table";




class FacilityInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilityData: []
        };
    }

    componentWillReceiveProps() {
        this.setState({
            facilityData: this.props.facilityData
        });
    }

    render() {
        const { facilityData } = this.state;

        console.log(facilityData);
        return (
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Facility Information: {facilityData.facilityName}</CardTitle>
                            </CardHeader>
                            <CardBody>
                            Facility Name: {facilityData.facilityName}
                            <br/>
                            Facility Code: {facilityData.code}
                            <br/>
                            Status: {facilityData.code}

                            
                            
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default FacilityInfo;