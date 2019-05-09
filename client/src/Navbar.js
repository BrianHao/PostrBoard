import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import './App.js';
import { Redirect } from "react-router-dom";

export default class Example extends React.Component {
  state = {
    isLoggedIn : false,
    }

    componentDidMount(){
      if(sessionStorage.getItem('loggedIn') === "true"){
        this.setState({ isLoggedIn : true });
      }
    }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }
  
  render() {

    return (
      <div>
        <Navbar color="dark" dark expand="md">
        <NavbarBrand className="mr-auto" href="/">
            <img class="logo mr-2"
              src={require('./images/postr.jpg')}
              alt={"Postr.Board Logo"} />
            Postr.<span className="primary-color">Board</span>
          </NavbarBrand>
          { this.state.isLoggedIn ? ( //Navbar if user not logged in
            <Nav className="ml-auto inline-item" navbar>
              <span className="navbar-text ml-auto mr-3 inline-item">
                Hello, {sessionStorage.getItem('username')}!
              </span>
              <NavItem className="inline-item">
                <NavLink onClick={() => this.logout()}>
                <i className="fas fa-sign-out-alt"></i> Log Out</NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav className="ml-auto inline-item" navbar>
              <NavItem className="inline-item">
                <NavLink href="/login/">
                <i className="fas fa-sign-in-alt mr-2"></i> Log In</NavLink>
              </NavItem>
              <NavItem className="inline-item">
                <NavLink href="/signup/">
                <i className="fas fa-user-plus"></i> Sign Up</NavLink>
              </NavItem>
            </Nav>
          )
          }
        </Navbar>
      </div>
    );
  }
}