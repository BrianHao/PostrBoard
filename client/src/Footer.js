import React from 'react';
import {
  Navbar,
  NavbarBrand
 } from 'reactstrap';
import './App.js';

export default class Example extends React.Component {
    render() {

    return (
      <div className="fixed-bottom">
        <Navbar className="justify-content-center" color="dark" dark expand="md">
          <NavbarBrand className="text-center">
            Postr.Board ©2019 Brian Hao
            <a href="https://github.com/brianhao" className="boardbutton mx-0">
							<i className="fab fa-github mr-1"></i>
						</a>
            <a href="https://www.linkedin.com/in/brianhao/" className="boardbutton mx-0">
							<i className="fab fa-linkedin mr-1"></i>
						</a>
            </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}