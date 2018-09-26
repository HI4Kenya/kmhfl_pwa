import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
import { Line, Bar, Doughnut } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import { PanelHeader, Stats, CardCategory } from "components";

import {
  dashboardPanelChart,
  // dashboardShippedProductsChart,
  // dashboardAllProductsChart,
  facilityOwnershipChart,
  facilityRegulatingBodiesChart,
  dashboard24HoursPerformanceChart
} from "variables/charts.jsx";

// import { tasks } from "variables/general.jsx";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader
          size="lg"
          content={
            <div>
              <Line
                data={dashboardPanelChart.data}
                options={dashboardPanelChart.options}
              />
            </div>
          }
        />
        <div className="content">
        <Row>
          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Maternity</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer maternity services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>

          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Emergency</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer maternity services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>

          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Pharmacy</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer maternity services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>

          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>VCT</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer maternity services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Radiology</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer radiology services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>

          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Laboratory</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer laboratory services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>

          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Ears,Nose and Throat</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer ENT services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>

          <Col xs = {12} md = {3} >
          <Card >
            <CardHeader>
              <CardTitle>Dental</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                Clicking on this button redirects you to facilities that offer dental services near your location.
                You may be prompted to provide location information.
              </p>
              <button>Facilities near me</button>
            </CardBody>
          </Card>
          </Col>
        </Row>
          <Row>
            {/* <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Trend in new facilities</CardCategory>
                  <CardTitle tag="h4">Shipped Products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardShippedProductsChart.data}
                      options={dashboardShippedProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col> */}
            {/* <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>2018 Sales</CardCategory>
                  <CardTitle tag="h4">All products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col> */}
            <Col xs={12} md={12}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Facility Distribution</CardCategory>
                  <CardTitle tag="h4">Number of Facilities by County</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[{ i: "now-ui-icons ui-2_time-alarm", t: "Last 7 days" }]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Facility Ownership</CardCategory>
                  <CardTitle tag="h4">Number of Facilities by ownership</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Doughnut
                      data={facilityOwnershipChart.data}
                      options={facilityOwnershipChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[{ i: "now-ui-icons ui-2_time-alarm", t: "Last 7 days" }]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Regulatory bodies</CardCategory>
                  <CardTitle tag="h4">Number of Facilities by Regulator Body</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={facilityRegulatingBodiesChart.data}
                      options={facilityRegulatingBodiesChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[{ i: "now-ui-icons ui-2_time-alarm", t: "Last 7 days" }]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  <CardCategory>Backend Development</CardCategory>
                  <CardTitle tag="h4">Tasks</CardTitle>
                </CardHeader>
                <CardBody>
                  <Tasks tasks={tasks} />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons loader_refresh spin",
                        t: "Updated 3 minutes ago"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <CardCategory>All Persons List</CardCategory>
                  <CardTitle tag="h4">Employees Stats</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className=" text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
