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
          <NavbarBrand className="text-center" href="https://github.com/brianhao">
            Postr.Board ©2019 Brian Hao
            
            </NavbarBrand>
            <a href="https://github.com/brianhao" className="boardbutton mx-2">
							<i className="fab fa-github mx-1"></i>
						</a>
            <a href="https://www.linkedin.com/in/brianhao/" className="boardbutton mx-0">
							<i className="fab fa-linkedin mx-1"></i>
						</a>
        </Navbar>
      </div>
    );
  }
}