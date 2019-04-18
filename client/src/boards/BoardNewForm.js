import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import HeaderBar from '../HeaderBar';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
      created: false,
		}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  

  submit = () => {
    let tempImage = this.state.image === "" ? "data:image/png;base64,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" : this.state.image ;
		fetch('http://localhost:5000/api/b', {
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
			console.log("Error creating new board");
		})
	}
  
    render() {
      if(this.state.created){
        return <Redirect to={"/b/" + this.state.name} />;
      }
      
      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/b"
            backText="All Boards"
            centerText="Create New Board"
            newLocation=""
            newText=""
          />

          <div className="container newBoardForm pt-5">
            <TextField
              id="standard-full-width"
              fullWidth
              style={{ margin: 8 }}
              margin="normal"
              label="Name"
              defaultValue=""
              helperText={ this.state.dup ? "This board name already exists! Enter a different board name." : 
              "This is the name for your board. It should be a single word in all lowercase. (eg. technology)"}
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
              defaultValue=""
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
              defaultValue=""
              helperText="You may provide an image for your board as its identity. 
              Please use an external image link."
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
              defaultValue=""
              helperText="You may provide a short (1-5 sentences) description of your board."
              value={this.state.description}
              onChange={this.handleChange('description')}
            />
             
            <div class="mt-5">
              <Button variant="contained" color="primary" onClick={() => this.submit()}>
                <i class="fas fa-plus mr-1"></i>Create Board
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