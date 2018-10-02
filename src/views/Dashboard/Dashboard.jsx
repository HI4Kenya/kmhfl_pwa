import React from "react";
import maternal from "../../Icons/maternal.png";
import pharmacy from "../../Icons/pharmacy.png";
import emergency from "../../Icons/emergency.png";
import ent from "../../Icons/ent.png"
import dental from "../../Icons/dental.png";
import vct from "../../Icons/vct.png";
import xray from "../../Icons/xray.png";
import lab from "../../Icons/lab.png";



import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Table
} from "reactstrap";
// react plugin used to create charts
import { Bar, Doughnut } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import { PanelHeader, CardCategory } from "components";

import {
  facilityOwnershipChart,
  facilityRegulatingBodiesChart,
  dashboard24HoursPerformanceChart
} from "variables/charts.jsx";




// import { tasks } from "variables/general.jsx";

class Dashboard extends React.Component {

  constructor(){
    super();
    
  }

  serviceButtonHandler(serviceName) {
    console.log("Service Selected is: ",serviceName);
    window.location ="http://localhost:3000/maps";
  }

  render() {
    
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={maternal} alt="maternal.png" width="40" height="40" />
                      Maternal
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer maternity services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"maternity")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={emergency} alt="emergency.png" width="40" height="40" />
                      Emergency
                       </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer emerency services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"emergency")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={pharmacy} alt="pharmacy.png" width="40" height="40" />
                      Pharmacy
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer phamarcy services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"pharmacy")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>

            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={vct} alt="vct.png" width="40" height="40" />
                      VCT
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer VCT services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"vct")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={ent} alt="ent.png" width="40" height="40" />
                      ENT
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer ENT services near your location.
                   </p>
                   <button onClick={this.serviceButtonHandler.bind(this,"ent")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={dental} alt="dental.png" width="40" height="40" />
                      Dental
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer Dental services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"dental")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={xray} alt="xray.png" width="40" height="40" />
                      Radiology
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer Radiology services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"radiology")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={3} >
              <Card >
                <CardHeader>
                  <CardTitle>
                    <div className="logo-img">
                      <img src={lab} alt="lab.png" width="40" height="40" />
                      Laboratory
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <p>
                    Click on this button to find facilities that offer Laboratory services near your location.
                  </p>
                  <button onClick={this.serviceButtonHandler.bind(this,"laboratory")}>Facilities near me</button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Facility Distribution</CardCategory>
                  <CardTitle tag="h4">Facilities by County</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Facility Ownership</CardCategory>
                  <CardTitle tag="h4">Facilities by ownership</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Doughnut
                      data={facilityOwnershipChart.data}
                      options={facilityOwnershipChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Regulatory bodies</CardCategory>
                  <CardTitle tag="h4">Facilities by Regulator Body</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={facilityRegulatingBodiesChart.data}
                      options={facilityRegulatingBodiesChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;