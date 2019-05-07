import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import './App.css';

export default function Alert(props) {
  return (
    <div>
      {(() => {
        switch(props.type) {
          case 'loginSuccess':
            return <UncontrolledAlert color="success">Successfully logged in as {sessionStorage.getItem('username')}!</UncontrolledAlert>;
          case 'warning':
            return <UncontrolledAlert color="info">WARNING!!</UncontrolledAlert>;
          case 'error':
            return <UncontrolledAlert color="info">error!</UncontrolledAlert>;;
          default:
            return null;
        }
      })()}
    </div>
  );
}