import React from 'react';
import { Redirect } from "react-router-dom";
import HeaderBar from '../HeaderBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Post.css';
import Card from '@material-ui/core/Card';
import Navbar from '../Navbar';


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

class PostNewForm extends React.Component {
	state = {
      title: "",
      link: "",
      text: "",
      boardName: "",
      boardTitle: "",
      id: "",
      error: false,
      found: true
    }
    
    componentWillMount(){
        let path = this.props.location.pathname.split("/");
        this.setState({ boardName: path[2] }, () => {
            let url = '/api/b/' + this.state.boardName;
			fetch(url, {
				method: 'GET',
				headers: {
					"Content-Type" : "application/json; charset=utf-8",
				},
			}).then(response => {
				//console.log("Successfully retrieved Board.");
				return response.json();
			}).then(body => {
                if(body.foundBoard === null) {
                  this.setState({ found: false});
                } else {
                  this.setState({ boardTitle: body.foundBoard.title});
                }
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
    if(this.state.title === "") {
        this.setState({ error: true });
      } else {
        let url = '/api/b/' + this.state.boardName;
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    postTitle: this.state.title,
                    postLink: this.state.link,
                    postText: this.state.text,
                    boardName: this.state.boardName,
                    boardTitle: this.state.boardTitle,
                    id: sessionStorage.getItem('id'),
                    username: sessionStorage.getItem('username'),
                }),
            }).then(response => {
                if(response.status === 200){
                    return response.json();
                }
            }).then(body => {
                this.setState({ id: body.id, created: true });
            }).catch((err) => {
                    console.log("Error creating Board.")
                    console.log(err);
            })
      }
	}
  
    render() {
      if(this.state.created){
        return <Redirect to={{
          pathname: "/b/" + this.state.boardName + "/" + this.state.id, 
          state: {boardName: this.state.boardName, postId: this.state.id}
          }} />;
      }

      if(!this.state.found){
        return <Redirect to={{
            pathname: "/pagenotfound"
            }} />;
    }
      
      let backUrl = "/b/" + this.state.boardName;

      return (
        <div className="container-fluid px-0">
          <Navbar/>
          <HeaderBar 
            backLocation={backUrl}
            backText={backUrl}
            centerText="Create New Post"
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
              label="Title"
              helperText={ this.state.error ? "Post title cannot be empty." : 
              "This the title of your post. It should be short and concise."}
              value={this.state.title}
              onChange={this.handleChange('title')}
              error={this.state.error}
              required
            />

            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Link"
              helperText="You may provide an external link that is relevant to your post."
              value={this.state.link}
              onChange={this.handleChange('link')}
            />
              
            <TextField
              id="standard-multiline-static"
              multiline
              fullWidth
              rows="4"
              margin="normal"
              label="Text"
              helperText="This is the main body for your post."
              value={this.state.text}
              onChange={this.handleChange('text')}
            />
             
            <div className="mt-5">
              <Button variant="contained" color="primary" onClick={() => this.submit()}>
                <i className="fas fa-plus mr-1"></i>Create Post
              </Button>
            </div>

          </Card>
        </div>
          
      );
    
}
}

PostNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostNewForm);