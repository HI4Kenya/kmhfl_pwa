import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class ServiceCard extends Component{
    constructor(props){
        super(props);
    }

render(){
  return (
    <div>
        <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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