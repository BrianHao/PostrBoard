import React from 'react';
import { Redirect } from "react-router-dom";
import HeaderBar from './HeaderBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Signup extends React.Component {
	state = {
    username: "",
    password: "",
    success: false,
    passError: false,
    userError: false
    }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  

  submit = () => {
    if(this.state.username === "") {
      this.setState({ userError: true, passError: false });
    } else if (this.state.password=== "") {
      this.setState({ userError: false, passError: true });
    } else {
      fetch('http://localhost:5000/api/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      }).then(response => {
        if(response.status === 200){
          //console.log("Creating new user");
          //console.log(response);
          return response.json();
        } 
      }).then(body => {
        //console.log(body.username);
        //console.log(body.id);
        this.setState({ success: true });
      }).catch(() => {
        console.log("Error creating user");
      })
    }
	}
  
    render() {
      if(this.state.success){
        return <Redirect to={"/login"} />;
      }

      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/"
            backText="Home"
            centerText="Sign Up"
            newLocation=""
            newText=""
            required
            color="primary"
          />

          <Card raised className="container newBoardForm my-5 p-5">
            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              error={this.state.userError}
              helperText={ this.state.userError ? "Username cannot be empty." : 
              ""}
              required
            />

            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              error={this.state.passError}
              helperText={ this.state.passError ? "Password cannot be empty." : 
              ""}
              type="password"
              required
            />
             
            <div className="mt-5">
              <Button variant="contained" color="primary" onClick={() => this.submit()}>
                <i className="fas fa-user-plus pr-2"></i>Sign Up
              </Button>
            </div>

          </Card>
        </div>
          
      );
    
}
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);