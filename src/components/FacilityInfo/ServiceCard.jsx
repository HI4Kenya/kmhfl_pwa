import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class ServiceCard extends Component{
    constructor(props){
        super(props);
    }

render(){
  return (
    <div>
        <Card>
        <CardBody>
          <CardTitle>{this.props.Service.service_name}</CardTitle>
          <CardSubtitle>Category Name:  {this.props.Service.category_name}</CardSubtitle>
          <CardText>Ratings:   {this.props.Service.average_rating}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
    )}

}
export default ServiceCard;