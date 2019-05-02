import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function HeaderBar(props) {
  const { classes } = props;

  return (
    <div className="sticky-top">
      <AppBar position="static" color={props.color}>
        <Toolbar>
          { props.backText ? (
            <Button component={Link} to={props.backLocation} color="inherit" className="headerButton">
              <i className="fas fa-chevron-left mr-1"></i>{props.backText}
            </Button>
          ) : <Button disabled> </Button> }
          <Typography variant="h4" color="inherit" className={classes.grow}>
            {props.centerText}
          </Typography>
          { props.newText ? (
            <Button component={Link} to={props.newLocation} color="inherit" className="headerButton">
            <i className="fas fa-plus mr-1"></i>{props.newText}
            </Button>
          ) : <Button disabled> </Button> }
        </Toolbar>
      </AppBar>
    </div>
  );
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);