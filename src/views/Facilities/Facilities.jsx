import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
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
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>MFL Code</th>
                                                <th>Facility Name</th>
                                                <th>KEPH Level</th>
                                            </tr>                                            
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>12345</td>
                                                <td>Kenyatta National Hospital</td>
                                                <td>Level 6</td>
                                            </tr>
                                            <tr>
                                                <td>67891</td>
                                                <td>Kisii General Hospital</td>
                                                <td>Level 5</td>
                                            </tr>                                            
                                            <tr>
                                                <td>54321</td>
                                                <td>Machakos District Hospital</td>
                                                <td>Level 4</td>
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