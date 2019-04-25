import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from './Landing';
import About from './About';
import Signup from './Signup';
import Login from './Login';
import Navbar from './Navbar';
import PageNotFound from './PageNotFound';
import { Boards, Board, BoardNewForm, BoardEditForm } from './boards';
import { Post, PostNewForm, PostEditForm } from './posts';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  logout() {
    sessionStorage.clear();
  }

  render() {
    
    //let isLoggedIn = sessionStorage.getItem('loggedIn') === "true";

    return (
      <div className="App">
        <div className="postr-navbar container-fluid mx-0 px-0">
          <Navbar />
        </div>

        <div className="main-content">
          <Switch>
            <Route exact={true} path="/" component={Landing}/>
            <Route exact={true} path="/about" component={About}/>
            <Route exact={true} path="/signup" component={Signup}/>
            <Route exact={true} path="/login" component={Login}/>
            <Route exact={true} path="/b" component={Boards}/>
            <Route exact={true} path="/b/new" component={BoardNewForm}/>
            <Route exact={true} path="/b/:boardName" component={Board}/>
            <Route exact={true} path="/b/:boardName/edit" component={BoardEditForm}/>
            <Route exact={true} path="/b/:boardName/new" component={PostNewForm}/>
            <Route exact={true} path="/b/:boardName/:postId" component={Post}/>
            <Route exact={true} path="/b/:boardName/:postId/edit" component={PostEditForm}/>
            <Route path="/*" component={PageNotFound}/>
            
            </Switch>
        </div>
      </div>
        
    );
  }
}

export default App;