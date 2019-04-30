import React from 'react';
import { Redirect } from "react-router-dom";
import HeaderBar from '../HeaderBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Post.css';
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

class PostNewForm extends React.Component {
	state = {
    postId: "",
    postTitle: "",
    postLink: "",
    postText: "",
    postBoard: "",
    foundBoard: "",
    error: false,
    found: true
    }
    
    componentWillMount(){
      let path = this.props.location.pathname.split("/");
      this.setState({ postBoard: path[2], postId: path[3] }, () => {
        let url = 'http://localhost:5000/api/b/' + this.state.postBoard + "/" + this.state.postId;
              fetch(url, {
          method: 'GET',
          headers: {
            "Content-Type" : "application/json; charset=utf-8",
          },
        }).then(response => {
          //console.log("Successfully retrieved Post.");
          return response.json();
        }).then(body => {
          this.setState({ 
                      postTitle: body.foundPost.title,
                      postLink: body.foundPost.link,
                      postText: body.foundPost.text,
                      foundBoard: body.foundPost.boardName,
                  },
                  () => {
                      if(this.state.postBoard !== this.state.foundBoard) {
                          this.setState({ found: false });
                      }
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
    let url = 'http://localhost:5000/api/b/' + this.state.postBoard + "/" + this.state.postId;
    fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
        postTitle: this.state.postTitle,
        postLink: this.state.postLink,
        postText: this.state.postText
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
      console.log("Error editing Post.")
			console.log(err);
		});
	}
  
    render() {
      if(this.state.edited){
        return <Redirect to={{
          pathname: "/b/" + this.state.postBoard + "/" + this.state.postId, 
          state: {boardName: this.state.postBoard}
          }} />;
      }

      if(!this.state.found){
        return <Redirect to={{
            pathname: "/pagenotfound"
            }} />;
    }
      
      let backUrl = "/b/" + this.state.postBoard + "/" + this.state.postId;

      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation={backUrl}
            backText="Back to Post"
            centerText="Edit Post"
            newLocation=""
            newText=""
            required
            color="primary"
          />

          <Card raised="true" className="container newBoardForm my-5 p-5">
            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Title"
              helperText={ this.state.error ? "Post title cannot be empty." : 
              "This the title of your post. It should be short and concise."}
              value={this.state.postTitle}
              onChange={this.handleChange('postTitle')}
              error={this.state.error}
            />

            <TextField
              id="standard-full-width"
              fullWidth
              margin="normal"
              label="Link"
              helperText="You may provide an external link that is relevant to your post."
              value={this.state.postLink}
              onChange={this.handleChange('postLink')}
            />
              
            <TextField
              id="standard-multiline-static"
              multiline
              fullWidth
              rows="4"
              margin="normal"
              label="Text"
              helperText="This is the main body for your post."
              value={this.state.postText}
              onChange={this.handleChange('postText')}
            />
             
            <div className="mt-5">
              <Button variant="contained" color="primary" onClick={() => this.submit()}>
                <i className="fas fa-plus mr-1"></i>Edit Post
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