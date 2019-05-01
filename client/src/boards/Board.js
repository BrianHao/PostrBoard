import React, {Component} from 'react';
import HeaderBar from '../HeaderBar';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import Moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './Board.css';
import PostCard from '../posts/PostCard';

export default class Board extends Component {
  
  constructor(props){
		super(props);
		this.state = {
			name: "",
			title: "",
			description: "",
			image: ".", // To prevent "Material-UI: either `image` or `src` property must be specified" error
			created: "",
			creator: "",
			posts: [],
			found: true,
			deleted: false
		};
  };
  
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
					description: body.foundBoard.description,
					image: body.foundBoard.image,
					created: body.foundBoard.created,
					creator: body.foundBoard.creator,
					posts: body.foundBoard.posts
				});
			}).catch((err) => {
				console.log("Error retrieving Board.")
				console.log(err);
				this.setState({ found: false });
			});
		});
	}

	deleteBoard(){
		let url = 'http://localhost:5000/api/b/' + this.state.name;
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		}).then(response => {
			if(response.status === 200){
				//console.log("Succesfully deleted board");
				this.setState({ deleted: true });
			}
		}).catch((err) => {
			console.log("Error deleting Board.")
			console.log(err);
		})
	}
  
  render() {

		let postsList = [];

      if (this.state.posts.length > 0) {
        for(let i = 0; i < this.state.posts.length; i++) {
          let currentPost = this.state.posts[i];
          postsList.unshift(
            <PostCard
              key={currentPost._id} {...currentPost}
            />
          );
        }
      }

		if(!this.state.found){
			return <Redirect to={{
				pathname: "/pagenotfound"
				}} />;
		}

		if(this.state.deleted){
			return <Redirect to={{
				pathname: "/b/"
				}} />;
		}

		const styles = {
			media: {
				height: 150,
			},
		};

		let editUrl = "/b/" + this.state.name + "/edit";
		let newPostUrl = "/b/" + this.state.name + "/new";

    return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/b"
            backText="All Boards"
            centerText={this.state.title}
            newLocation={newPostUrl}
            newText="New Post"
						color="primary"
          />

					<Card raised className="container mx-auto m-3">
						<div className="row">
							<CardMedia
								className="col-sm-3"
								style={styles.media}
								image={this.state.image}
							/>
							<CardContent className="col-sm-9 text-left pb-0">
								<Typography gutterBottom variant="h5" component="h2">
									{this.state.description}
								</Typography>
								<Typography component="p">
									<strong>Created by:</strong> {this.state.creator}
								</Typography>
								<Typography component="p">
									<strong>Created on:</strong> {Moment(this.state.created).format('MMMM Do YYYY, h:mm:ss a')}
								</Typography>
								{ this.state.creator !== "Admin.s" ? 
								<CardActions className="px-0 pb-0">
									<a href={editUrl} className="btn btn-sm btn-outline-info boardbutton mx-0">
										<i className="far fa-edit mr-1"></i> Edit Board
									</a>
									<button type="button" className="btn btn-sm btn-outline-danger boardbutton"
										onClick={() => this.deleteBoard()}>
										<i className="far fa-trash-alt"></i> Delete Board
									</button>
								</CardActions> 
								: "" }
								</CardContent>
							</div>
								<hr/>
								<div className="text-left">
									{ postsList.length > 0 ? postsList : <div className="text-center pb-3">No Posts to display!</div> }
								</div>
    				</Card>
        </div>
    );
  }
}