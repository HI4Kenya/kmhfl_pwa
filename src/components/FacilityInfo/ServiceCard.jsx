import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
                        <Button>Add Review</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }

}
export default ServiceCard;