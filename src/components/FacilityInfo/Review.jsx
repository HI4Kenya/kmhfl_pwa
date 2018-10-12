import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Button, Input, InputGroup } from 'reactstrap';



class Review extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Write your review</CardTitle>
                        <InputGroup className="no-border">
                            <Input id="review" />                            
                        </InputGroup>
                        <Button className = "btn-round">Submit</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Review;