// import React from "react";
// import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
// import axios from "axios";
// const keys = require('variables/keys.json')
// const baseURL = "http://api.kmhfltest.health.go.ke/api"

// class FacilityInfo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             facilityId: [],
//             facilityName: "",
//             open_weekends: "",
//             open_public_holidays: "",
//             open_whole_day: "",
//             open_normal_day: "",
//             number_of_beds: "",
//             number_of_cots: "",
//             date_established: "",
//             county_name: "",
//             sub_county_name: "",
//             ward_name: "",
//         };
//     }

//     componentWillReceiveProps(newProps) {
//         //get facility data
//         console.log("Current props",this.props.facilityId);
//         console.log("New props",newProps.facilityId);
//         if (newProps.facilityId != [] && newProps.facilityId != this.props.facilityId) {
//             axios.get(`${baseURL}/facilities/facilities/?id=${newProps.facilityId}&format=json&page_size=1`, {
//                 headers: {
//                     Authorization: `Bearer ${keys.accessToken}`
//                 }
//             }).then((response) => {

//                 const facilities = response.data.results;
//                 this.setState({
//                     facilityData: facilities,
//                     facilityName: facilities[0].official_name,
//                     open_weekends: facilities[0].open_weekends.toString(),
//                     open_public_holidays: facilities[0].open_public_holidays.toString(),
//                     open_whole_day: facilities[0].open_whole_day.toString(),
//                     open_normal_day: facilities[0].open_normal_day.toString(),
//                     number_of_beds: facilities[0].number_of_beds,
//                     number_of_cots: facilities[0].number_of_cots,
//                     date_established: facilities[0].date_established,
//                     county_name: facilities[0].county_name,
//                     sub_county_name: facilities[0].sub_county_name,
//                     ward_name: facilities[0].ward_name,
//                 });
//             }).catch((error) => {
//                 console.log(error);
//             })
//         }

//     }

//     render() {
//         return (
//             <div className="content">
//                 <Row>
//                     <Col xs={12}>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle tag="h4">{this.state.facilityName}</CardTitle>
//                                 <hr />
//                             </CardHeader>
//                             <CardBody>
//                                 <div className="title">Basic Details</div>
//                                 <hr />
//                                 <Row>
//                                     <Col xs={12} md={6}>
//                                         Open weekends: <b>{this.state.open_weekends}</b>
//                                         <br />
//                                         Open on public holidays : <b>{this.state.open_public_holidays}</b>
//                                         <br />
//                                         Open 24 Hrs: <b>{this.state.open_whole_day}</b>
//                                         <br />
//                                         Open from 8am - 5pm: <b>{this.state.open_normal_day}</b>
//                                     </Col>
//                                     <Col xs={12} md={6}>
//                                         Beds: <b>{this.state.number_of_beds}</b>
//                                         <br />
//                                         Cots: <b>{this.state.number_of_cots}</b>
//                                         <br />
//                                         Date established: <b>{this.state.date_established}</b>
//                                         <br />
//                                         Keph Level: <b>{this.state.keph_level_name}</b>
//                                     </Col>
//                                 </Row>
//                                 <hr />
//                                 <div className="title">Location Details</div>
//                                 <hr />
//                                 <Row>
//                                     <Col>
//                                         County: <b>{this.state.county_name}</b>
//                                         <br />
//                                         Sub County: <b>{this.state.sub_county_name}</b>
//                                         <br />
//                                         Ward: <b>{this.state.ward_name}</b>
//                                         <br />
//                                     </Col>
//                                     <Col>
//                                         <br />
//                                         <button>Find on map</button>
//                                     </Col>
//                                 </Row>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>

//             </div>
//         );
//     }
// }

// export default FacilityInfo;




import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import ServiceCard from "./ServiceCard.jsx";

const baseURL = "http://api.kmhfltest.health.go.ke/api"
const token = require('variables/keys.json');
class FacilityInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilityId: [],
            facilityName: "",
            open_weekends: "",
            open_public_holidays: "",
            open_whole_day: "",
            open_normal_day: "",
            number_of_beds: "",
            number_of_cots: "",
            date_established: "",
            county_name: "",
            sub_county_name: "",
            ward_name: "",
            Services:[]
    }
}
    componentWillReceiveProps(nextProps) {
        //get facility data
        console.log(nextProps.facilityId)
        if (nextProps.facilityId !== []){
            axios.get(`${baseURL}/facilities/facilities/?id=${nextProps.facilityId}&format=json&page_size=1`, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}` 
                }
            }).then((response) => {
    
                const facilities = response.data.results;
                //console.log(facilities[0].facility_services);
                // console.log("fetched Data", facilities);
                //console.log(facilities[0].facility_services);
               const servicesdata=facilities[0].facility_services;
                const nextServices = servicesdata.map(servicesdataObject=>{
                   
                    return{
                        service_name:servicesdataObject.service_name.toString(),
                        category_name:servicesdataObject.category_name.toString(),
                        average_rating:servicesdataObject.average_rating.toString()
                    }
                })
                console.log(nextServices)
                
                this.setState({
                    facilityData: facilities,
                    facilityName: facilities[0].official_name,
                    open_weekends: facilities[0].open_weekends.toString(),
                    open_public_holidays: facilities[0].open_public_holidays.toString(),
                    open_whole_day: facilities[0].open_whole_day.toString(),
                    open_normal_day: facilities[0].open_normal_day.toString(),
                    number_of_beds: facilities[0].number_of_beds,
                    number_of_cots: facilities[0].number_of_cots,
                    date_established: facilities[0].date_established,
                    county_name: facilities[0].county_name,
                    sub_county_name: facilities[0].sub_county_name,
                    ward_name: facilities[0].ward_name,
                    Services:nextServices
                })
                
                
            }).catch((error) => {
                console.log(error);
            })
        }
        
    }

    // componentDidMount() {
    // }
render() {
    let ServiceCards=this.state.Services.map(Service=>{
        return(
        <Col sm="4">
         <ServiceCard Service={Service}/> 
        </Col>
        )
    })
       
     return (
            <div className="content" style={{zIndex: '10'}}> 
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">{this.state.facilityName}</CardTitle>
                                <hr/>
                            </CardHeader>
                            <CardBody>
                                <div className="title">Basic Details</div>
                                <hr/>
                                <Row>
                                
                                    <Col xs={12} md={6}>
                                        Open weekends: <b>{this.state.open_weekends}</b>
                                        <br />
                                        Open on public holidays : <b>{this.state.open_public_holidays}</b>
                                        <br />
                                        Open 24 Hrs: <b>{this.state.open_whole_day}</b>
                                        <br />
                                        Open from 8am - 5pm: <b>{this.state.open_normal_day}</b>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        Beds: <b>{this.state.number_of_beds}</b>
                                        <br />
                                        Cots: <b>{this.state.number_of_cots}</b>
                                        <br />
                                        Date established: <b>{this.state.date_established}</b>
                                        <br />
                                        Keph Level: <b>{this.state.keph_level_name}</b>
                                    </Col>
                                </Row>
                                <hr />
                                <div className="title">Location Details</div>
                                <hr/>
                                <Row>
                                    <Col>
                                        County: <b>{this.state.county_name}</b>
                                        <br />
                                        Sub County: <b>{this.state.sub_county_name}</b>
                                        <br />
                                        Ward: <b>{this.state.ward_name}</b>
                                        <br />
                                    </Col>
                                    <Col>
                                        <br />
                                        <button>Find on map</button>
                                    </Col>
                                </Row>
                                <hr />
                                <div className="title">Services Offered</div>
                                <hr/>
                                <Row>
                                    {ServiceCards}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default FacilityInfo;