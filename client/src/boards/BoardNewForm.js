import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class BoardNewForm extends Component {
  constructor(props){
		super(props);
		this.state = {
      name: "",
      title: "",
      description: "",
      image: ""
		}
  }
  
    render() {
      return (
        <div className="container">
          <Form>
            <h1 className="py-5">Create New Board</h1>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Label for="exampleText" sm={2}>Text Area</Label>
              <Col sm={10}>
                <Input type="textarea" name="text" id="exampleText" />
              </Col>
            </FormGroup>
            
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    }
}