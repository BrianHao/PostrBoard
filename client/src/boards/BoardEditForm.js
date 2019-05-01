import React from 'react';
import { Redirect } from "react-router-dom";
import HeaderBar from '../HeaderBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Board.css';
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

class BoardNewForm extends React.Component {
		state = {
      name: "",
      title: "",
      oldTitle: "",
      description: "",
      image: "",
      edited: false,
      found: true
    }
    
    componentWillMount(){
      let path = this.props.location.pathname.split("/");
      this.setState({ name: path[2] }, () => {
        let url = 'http://localhost:5000/api/b/' + this.state.name;
        fetch(url, {
          method: 'GET',
          headers: {
            "Content-Type" : "application/json; charset=utf-8",
          },
        }).then(response => {
          //console.log("Successfully retrieved Board.");
          return response.json();
        }).then(body => {
          this.setState({ 
            title: body.foundBoard.title,
            oldTitle: body.foundBoard.title,
            description: body.foundBoard.description,
            image: body.foundBoard.image
          });
        }).catch((err) => {
          console.log("Error retrieving Board.")
          console.log(err);
          this.setState({ found: false });
        });
      });
    }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  

  submit = () => {
    let url = 'http://localhost:5000/api/b/' + this.state.name;
    fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
        boardName: this.state.name,
        boardTitle: this.state.title,
        boardImage: this.state.image,
				boardDescription: this.state.description,
			}),
		}).then(response => {
			if(response.status === 200){
				return response.json();
			}
		}).then(body => {
        if(body.edited) {
          this.setState({ edited: true });
        }
		}).catch((err) => {
      console.log("Error editing Board.")
			console.log(err);
		});
  }
  
    render() {
      if(this.state.edited){
        return <Redirect to={{
          pathname: "/b/" + this.state.name, 
          state: {boardName: this.state.name}
          }} />;
      }

      if(!this.state.found){
        return <Redirect to={{
          pathname: "/pagenotfound"
          }} />;
      }

      let backUrl = "/b/" + this.state.name;
      
      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation={backUrl}
            backText={backUrl}
            centerText="Edit Board"
            newLocation=""
            newText=""
            color="primary"
          />

          <Card raised className="container newBoardForm my-5 p-5">
            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Name"
              disabled
              helperText={ this.state.dup ? "This board name already exists! Enter a different board name." : 
              "This is the name for your board and cannot be changed. It should be a single word in all lowercase. (eg. technology)"}
              value={this.state.name}
              onChange={this.handleChange('name')}
              error={this.state.dup}
              required
            />

            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Title"
              helperText="This is the title for your board. It should be short
              and describes the main topic or theme. (eg. Technology)"
              value={this.state.title}
              onChange={this.handleChange('title')}
              required
            />

            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Image"
              helperText="You may set an image for your board as its identity. 
              Please provide an external image link."
              value={this.state.image}
              onChange={this.handleChange('image')}
            />
              
            <TextField
              id="standard-multiline-static"
              multiline
              fullWidth
              rows="4"
              margin="normal"
              label="Description"
              helperText="You may provide a short description of your board."
              value={this.state.description}
              onChange={this.handleChange('description')}
            />
             
            <div className="mt-5">
              <Button variant="contained" color="primary" onClick={() => this.submit()}>
                <i className="fas fa-plus mr-1"></i>Edit Board
              </Button>
            </div>

          </Card>
        </div>
          
      );
    
}
}

BoardNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BoardNewForm);