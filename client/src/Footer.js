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
          <NavbarBrand className="text-center" href="/">Postr.Board ©2019 Brian Hao</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}