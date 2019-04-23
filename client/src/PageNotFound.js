import React, {Component} from 'react';
import HeaderBar from './HeaderBar';

export default class Board extends Component {
    render() {
      return (
          <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/"
            backText="Home"
            centerText="Error: Page Not Found"
            newLocation=""
            newText=""
            color="secondary"
          />
          <div className="container">
          </div>
        </div>
      );
    }
}