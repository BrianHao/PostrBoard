import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import "./Post.css"

const styles = {
    card: {
        background: "#f9f9f9",
      },
};

function deleteComment(props){
    let url = '/api/b/' + props.boardName + "/" + props.postId + "/" + props._id;
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		}).then(response => {
			if(response.status === 200){
				//console.log("Succesfully deleted comment");
				window.location.reload();
			}
		}).catch((err) => {
			console.log("Error deleting Comment.")
			console.log(err);
		})
}

function MediaCard(props) {
    

      return (
      <div className="mx-1 my-3 px-0">
      <Card className="container px-0 gray2">
            <div className="">
                <CardContent style={styles.card} className="p-0">
                <Typography inline className="m-3 py-0" color="default" variant="body1" component="h2" >
                    {props.text}
                </Typography>
                { (props.author.username === sessionStorage.getItem('username') || sessionStorage.getItem('username') === 'Admin') ? 
                <Typography inline className="float-right" color="default" variant="body1" component="h2" >
                    <button type="button" className="btn btn-sm btn-outline-danger boardbutton p-0 m-1"
						onClick={() => deleteComment(props)}>
							<i className="fas fa-times mx-1"></i>
					</button>
                </Typography>
                : "" }
                <hr className="mb-0 mt-2 mx-1" />
                <Typography className="mx-3" inline variant="caption" component="h2">
                    Posted <strong>{Moment(props.created).fromNow()} </strong>
                    by <strong>{props.author.username}</strong>.
                </Typography>
                </CardContent>
            </div>
    </Card>
      </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);