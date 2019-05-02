import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


class CommentCreateForm extends React.Component {
    state = {
        comment: "",
      }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit = () => {
    let url = '/api/b/' + this.props.boardName + "/" + this.props.postId;
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    comment: this.state.comment,
                    postId: this.props.postId,
                    id: sessionStorage.getItem('id'),
                    username: sessionStorage.getItem('username'),
                }),
            }).then(response => {
                if (response.status === 200){
                    return response.json();
                }
            }).then(body => {
                this.setState({ created: true });
            }).catch((err) => {
                    console.log("Error creating Board.")
                    console.log(err);
            })
  }

  render() {

    if(this.state.created){
        window.location.reload();
      }

    return (
      <form>
        <TextField
          label="New Comment"
          fullWidth
          margin="dense"
          variant="outlined"
          rows="2"
          multiline
          onChange={this.handleChange('comment')}
        />
        <div className="text-left">
          {sessionStorage.getItem('loggedIn') === "true" ? 
            <button type="button" className="btn btn-sm btn-outline-primary boardbutton"
				onClick={() => this.submit()}>
                <i className="far fa-comment-alt mr-1"></i> Post Comment
			</button> : 
      <Typography component={Link} to="/login" className=" text-center py-0" color="default" variant="overline" component="h2" >
              Log In to Leave a Comment
            </Typography> }
        </div>
      </form>
    );
  }
}

export default CommentCreateForm;