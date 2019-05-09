import React, {Component} from 'react';
import HeaderBar from './HeaderBar';
import Navbar from './Navbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import PostCard from './posts/PostCard';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Alert from './Alert';

export default class Landing extends Component {
  constructor(props){
		super(props);
		this.state = {
      posts: [],
      alertMsg: ""
		};
  };

  componentWillMount(){
      if(this.props.location.state !== undefined) {
        this.setState({ alertMsg: this.props.location.state.alertMsg });
      }
			let url = '/api/';
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
					posts: body.foundPosts
				});
			}).catch((err) => {
				console.log("Error retrieving Posts.")
				console.log(err);
				this.setState({ found: false });
			});
	}

    render() {
      let postsList = [];

      if (this.state.posts.length > 0) {
        for(let i = 0; i < this.state.posts.length; i++) {
          let currentPost = this.state.posts[i];
          postsList.push(
            <PostCard
              key={currentPost._id} {...currentPost}
            />
          );
        }
      }

      return (
        <div className="container-fluid px-0">
          <Navbar/>
          <HeaderBar 
            backLocation=""
            backText=""
            centerText="Welcome to Postr.Board"
            newLocation=""
            newText=""
            color="primary"
          />
          <Alert type={this.state.alertMsg} />

          <Card raised className="container mx-auto m-3">
            <Button component={Link} to="/b" color="primary" variant="contained" size="large" className="mt-3 mb-2 headerButton">
              View All Boards
            </Button>
								<hr className="mt-2" />
                <Typography className=" text-center py-0" color="default" variant="overline" component="h2" >
              Showing 10 Most Recent Posts
              {this.state.alertMsg}
            </Typography>
								<div className="text-left">
									{ postsList.length > 0 ? postsList : <div className="text-center pb-3">No Posts to display!</div> }
								</div>
    				</Card>
        </div>
      );
    }
} 