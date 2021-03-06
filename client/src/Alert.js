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
          case 'loginError':
            return <UncontrolledAlert color="danger">Error: Incorrect credentials. Please try again.</UncontrolledAlert>;
          case 'logoutSuccess':
            return <UncontrolledAlert color="success">Successfully logged out.</UncontrolledAlert>;
          case 'signupSuccess':
            return <UncontrolledAlert color="success">Successfully signed up! You may now log in.</UncontrolledAlert>;
          case 'signupError':
            return <UncontrolledAlert color="danger">Error: Unable to register account with this username.</UncontrolledAlert>;
          case 'createBoardSuccess':
            return <UncontrolledAlert color="success">Successfully created Board!</UncontrolledAlert>;
          case 'createBoardError':
            return <UncontrolledAlert color="danger">Error: Could not create Board. Please ensure board name is unique and title is not empty.</UncontrolledAlert>;
          case 'createPostSuccess':
            return <UncontrolledAlert color="success">Successfully created Post!</UncontrolledAlert>;
          case 'createPostError':
            return <UncontrolledAlert color="danger">Error: Could not create Post. Please ensure title is not empty.</UncontrolledAlert>;
          case 'editBoardSuccess':
            return <UncontrolledAlert color="success">Successfully edited Board!</UncontrolledAlert>;
          case 'deleteBoardSuccess':
            return <UncontrolledAlert color="success">Successfully deleted Board!</UncontrolledAlert>;
          case 'editPostSuccess':
            return <UncontrolledAlert color="success">Successfully edited Post!</UncontrolledAlert>;
          case 'deletePostSuccess':
            return <UncontrolledAlert color="success">Successfully deleted Post!</UncontrolledAlert>;
          case 'createCommentSuccess':
            return <UncontrolledAlert color="success">Successfully deleted Post!</UncontrolledAlert>;
          case 'deleteCommentSuccess':
            return <UncontrolledAlert color="success">Successfully deleted Post!</UncontrolledAlert>;
          default:
            return null;
        }
      })()}
    </div>
  );
}