import React, {Component} from 'react';
import HeaderBar from './HeaderBar';

export default class Landing extends Component {
    render() {
      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation=""
            backText=""
            centerText="Welcome to Postr.Board"
            newLocation=""
            newText=""
            color="primary"
          />
          <div className="container">
          <a href="/b" className="btn btn-primary mt-5">View All Boards</a>
          </div>
        </div>
      );
    }
}