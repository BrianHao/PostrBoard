import React, {Component} from 'react';
import HeaderBar from '../HeaderBar';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import Moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import './Post.css';
import CommentCreateForm from './CommentCreate';
import Comment from "./Comment";

export default class Post extends Component {
  
  constructor(props){
		super(props);
		this.state = {
            postId: "",
            postTitle: "",
            postLink: "",
            postText: "",
            postCreated: "",
            postUpdated: "",
            postComments: [],
            postAuthor: "",
            postBoard: "",
            boardTitle: "",
            foundBoard: "",
            found: true,
            deleted: false
		};
  };
  
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
                    postCreated: body.foundPost.created,
                    postUpdated: body.foundPost.updated,
                    postComments: body.foundPost.comments,
                    postAuthor: body.foundPost.author,
                    foundBoard: body.foundPost.boardName,
                    boardTitle: body.foundPost.boardTitle,
                },
                () => {
                    if(this.state.postBoard !== this.state.foundBoard) {
                        this.setState({ found: false });
                    } else {
                      var prefix1 = 'http://';
                      var prefix2 = 'https://';
                      if ((this.state.postLink) && (this.state.postLink.substr(0, prefix1.length) !== prefix1) &&
                      (this.state.postLink.substr(0, prefix2.length) !== prefix2)){
                        let link = prefix1 + this.state.postLink;
                        this.setState({ postLink: link });
                      }
                    }
                });
			}).catch((err) => {
				console.log("Error retrieving Board.")
                console.log(err);
                this.setState({ found: false });
			});
		});
	}

	deletePost(){
		let url = 'http://localhost:5000/api/b/' + this.state.postBoard + "/" + this.state.postId;
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		}).then(response => {
			if(response.status === 200){
				//console.log("Succesfully deleted post");
				this.setState({ deleted: true });
			}
		}).catch((err) => {
			console.log("Error deleting Post.")
			console.log(err);
		})
	}
  
  render() {
    let commentsList = [];

        if(!this.state.found){
            return <Redirect to={{
                pathname: "/pagenotfound"
                }} />;
        }

        if(this.state.deleted){
			return <Redirect to={{
				pathname: "/b/" + this.state.postBoard
				}} />;
    }
    
    if (this.state.postComments.length > 0) {
      for(let i = 0; i < this.state.postComments.length; i++) {
        let currentComment = this.state.postComments[i];
        commentsList.push(
          <Comment
            key={currentComment._id} {...currentComment}
          />
        );
      }
    }

    

		let editUrl = "/b/" + this.state.postBoard + "/" + this.state.postId + "/edit";
    let boardName = "/b/" + this.state.postBoard;

    return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation={boardName}
            backText={boardName}
            centerText={this.state.boardTitle}
            newLocation=""
            newText=""
			      color="primary"
          />

          <Card className="container mx-auto m-3">
						<div className="row">
							<CardContent className="text-left pb-0 col-sm-12">
						    <Typography gutterBottom color="primary" variant="h4" component="h2">
									{this.state.postTitle}
								</Typography>
                <Typography gutterBottom variant="caption" component="h2">
									Link: {this.state.postLink ? <Link href={this.state.postLink} target="_blank">
                    {this.state.postLink} </Link> : "None provided."}
								</Typography>
								<Typography gutterBottom className="border rounded p-2" variant="body1" component="h2">
									{this.state.postText}
								</Typography>
                <Typography variant="caption" component="h2">
                    Posted on <strong>{Moment(this.state.postCreated).format('MMMM Do YYYY, h:mm:ss A')} </strong>
                    in <strong>{this.state.postBoard} </strong> 
                    by <strong>{this.state.postAuthor} </strong>.
                </Typography>
                { this.state.postUpdated ? <Typography variant="caption" component="h2"><em>Edited: {Moment(this.state.postUpdated).format('MMMM Do YYYY, h:mm:ss A')}</em></Typography>
                : "" }
								<CardActions className="px-0 pb-0">
									<a href={editUrl} className="btn btn-sm btn-outline-info boardbutton mx-0">
										<i className="far fa-edit mr-1"></i> Edit Post
									</a>
									<button type="button" className="btn btn-sm btn-outline-danger boardbutton"
										onClick={() => this.deletePost()}>
										<i className="far fa-trash-alt mr-1"></i> Delete Post
									</button>
								</CardActions>
								</CardContent>
							</div>
								<hr className="mb-0" />
                <div>
                  <CommentCreateForm 
                  boardName={this.state.boardName}
                  postId={this.state.postId}
                  />
                </div>
                <hr className="mt-1" />
								<div className="text-left">
                { commentsList.length > 0 ? commentsList : <div className="text-center pb-3">No Comments to display!</div> }
								</div>
    				</Card>

        </div>
    );
  }
}