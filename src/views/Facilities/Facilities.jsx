import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { PanelHeader } from "components";
import { thead, tbody} from "variables/general";


class Facilities extends React.Component {
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
                                    {/* search for health facilities */}
                                    <form>
                                        <InputGroup className="no-border">
                                            <Input placeholder="Search..." />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_zoom-bold" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </form>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>MFL Code</th>
                                                <th>Facility Name</th>
                                                <th>KEPH Level</th>
                                                <th>View Facility</th>
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