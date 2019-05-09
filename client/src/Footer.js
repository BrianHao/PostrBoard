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
        <Navbar className="justify-content-center py-0" color="dark" dark expand="md">
          <NavbarBrand className="text-center" href="https://github.com/brianhao">
            <img className="logo-footer pb-1 mr-2"
              src={require('./images/postr.jpg')}
              alt={"Postr.Board Logo"} />
              Postr.<span className="primary-color">Board</span> <span className="footer-text">©2019 Brian Hao</span>
            
            </NavbarBrand>
            <a href="https://github.com/brianhao" className="boardbutton mx-0">
							<i className="fab fa-github mr-2"></i>
						</a>
            <a href="https://www.linkedin.com/in/brianhao/" className="boardbutton mx-0">
							<i className="fab fa-linkedin"></i>
						</a>
        </Navbar>
      </div>
    );
  }
}