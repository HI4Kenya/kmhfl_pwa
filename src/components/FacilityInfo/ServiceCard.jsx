import React, { Component } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Review from "./Review.jsx";
import Popup from "reactjs-popup";



class ServiceCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.Service.service_name}</CardTitle>
                        <CardSubtitle>Category: {this.props.Service.category_name}</CardSubtitle>
                        <CardText>Ratings: {this.props.Service.average_rating}</CardText>
                        <Popup
                            trigger={<Button className = "btn-round">Add Review</Button>} modal>
                            <Review></Review>
                        </Popup>
                    </CardBody>
                </Card>
            </div>
        )
    }

}
export default ServiceCard;