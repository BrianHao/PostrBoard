import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import "./Post.css"

const styles = {
    card: {
        background: "#f9f9f9",
      },
  media: {
    height: 100,
  },
};

function MediaCard(props) {
      return (

      <div className="mx-1 my-3 px-0">
      <Card className="container px-0 gray2">
          <Link to={{
          pathname: "/b/" + props.boardName + "/" + props._id, 
          state: {boardName: props.boardName, postId: props._id}
          }} 
          style={{ textDecoration: 'none' }}>
            <CardActionArea className="boardbutton row">
                <CardContent style={styles.card} className="py-0">
                <Typography  color="primary" variant="h6" component="h2" >
                    {props.title}
                </Typography>
                <Typography inline variant="caption" component="h2">
                    Posted on <strong>{Moment(props.created).format('MMMM Do YYYY, h:mm:ss A')} </strong>
                    in <strong>{props.boardName} </strong> 
                    by <strong>{props.author} </strong> 
                    with <strong>{props.commentCount} comments</strong>.
                </Typography>
                </CardContent>
            </CardActionArea>
            </Link>
    </Card>
      </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);