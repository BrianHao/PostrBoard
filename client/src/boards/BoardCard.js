import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  media: {
    height: 100,
  },
};

function MediaCard(props) {
    

  return (
      <div className="col-sm-6 col-md-4 col-lg-3 my-1">
      <Card>
          <Link to={'/b/' + props.name} style={{ textDecoration: 'none' }}>
      <CardActionArea>
        <CardMedia
          style={styles.media}
          image={props.image}
        />
        <CardContent style={styles.card}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions style={styles.card} className="d-flex justify-content-between">
        <Typography component="h6" className="mx-auto">
            1234 Posts
        </Typography>
        <Button className="" component={Link} to={props.newLocation} color="inherit">
            <i class="fas fa-plus mr-1"></i>
        </Button>
      
      </CardActions>
    </Card>
      </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);