import React, {Component} from 'react';
import HeaderBar from './HeaderBar';
import Navbar from './Navbar';
import Card from '@material-ui/core/Card';

export default class About extends Component {
  render() {
      return (
        <div className="container-fluid px-0">
          <Navbar/>
          <HeaderBar 
            backLocation="/"
            backText="Home"
            centerText="Welcome to Postr.Board"
            newLocation=""
            newText=""
            color="primary"
          />
          <Card raised className="container mx-auto m-3">
            Hello
    				</Card>
        </div>
      );
    }
}