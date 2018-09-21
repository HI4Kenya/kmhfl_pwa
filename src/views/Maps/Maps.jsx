import React from "react";
import { Row, Col, Card, CardHeader, CardTitle } from "reactstrap";
import { PanelHeader } from "components";
import DrillDown from "../../components/DrillDown/DrillDown";

class FullScreenMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: []
        };
    }

    getFacilities = (facilityData) => {
        this.setState({
            facilities: facilityData
        });
        console.log(facilityData);
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
                                    <CardTitle tag="h4">Facility Locator</CardTitle>
                                    <DrillDown/>
                                </CardHeader>                                
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>

        );
    }
}

export default FullScreenMap;
