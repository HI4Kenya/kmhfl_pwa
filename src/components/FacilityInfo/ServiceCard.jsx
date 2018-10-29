import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Card, CardText, CardBody,Form, FormGroup, Label, Input,Col,
  CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import ReactStars from 'react-stars'
  import { render } from 'react-dom'
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }

class ServiceCard extends Component{
    constructor(props){
        super(props);
        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }



render(){
  return (
    <div>
        <Card>
        <CardBody>
          <CardTitle>{this.props.Service.service_name}</CardTitle>
          <CardSubtitle>Category Name:  {this.props.Service.category_name}</CardSubtitle>
          <CardText>Ratings:   {this.props.Service.average_rating}</CardText>
          <Button onClick={this.toggle}> Rate this Service</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Service Rating</ModalHeader>
          <ModalBody>
          <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}> 
             <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
            <AvField type="email" name="email" id="exampleEmail" placeholder="your email" required/>
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label for="exampleText" sm={2}>Comment</Label>
          <Col sm={10}>
            <Input type="textarea" name="comment" id="exampleText" />
          </Col>
        </FormGroup>
        <FormGroup>
        <Label for="exampleText" sm={2}>Rate</Label>
        <Col sm={10}>
        <ReactStars id="exampleText"
  count={5}
  onChange={ratingChanged}
  size={75}
  color2={'#ffd700'} />
        </Col>
        </FormGroup>
        </AvForm> 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Submit Rating</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </CardBody>
      </Card>

    </div>
    
    )}
    
  }

     

export default ServiceCard;