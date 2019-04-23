import React from 'react';
import { Redirect } from "react-router-dom";
import HeaderBar from '../HeaderBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Board.css';

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
      description: "",
      image: "",
      dup: false,
		}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  

  submit = () => {
    let tempImage = this.state.image === "" ? "https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg" : this.state.image ;
    let url = 'http://localhost:5000/api/b';
    fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
        boardName: this.state.name,
        boardTitle: this.state.title,
        boardImage: tempImage,
				boardDescription: this.state.description,
			}),
		}).then(response => {
			if(response.status === 200){
				return response.json();
			}
		}).then(body => {
        if(body.created) {
          this.setState({ created: true });
        } else {
          this.setState({ dup: true });
        }
		}).catch((e) => {
			console.log(e);
		})
	}
  
    render() {
      if(this.state.created){
        return <Redirect to={{
          pathname: "/b/" + this.state.name, 
          state: {boardName: this.state.name}
          }} />;
      }
      
      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/b"
            backText="All Boards"
            centerText="Create New Board"
            newLocation=""
            newText=""
            color="primary"
          />

          <div className="container newBoardForm my-5">
            <TextField
              id="standard-full-width"
              fullWidth
              style={{ margin: 8 }}
              margin="normal"
              label="Name"
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
              style={{ margin: 8 }}
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
              style={{ margin: 8 }}
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
              style={{ margin: 8 }}
              margin="normal"
              label="Description"
              helperText="You may provide a short description of your board."
              value={this.state.description}
              onChange={this.handleChange('description')}
            />
             
            <div className="mt-5">
              <Button variant="contained" color="primary" onClick={() => this.submit()}>
                <i className="fas fa-plus mr-1"></i>Create Board
              </Button>
            </div>

          </div>
        </div>
          
      );
    
}
}

BoardNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BoardNewForm);