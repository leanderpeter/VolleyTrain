import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, makeStyles} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function Player2(props){
  const classes = styles();
  return(
    <div className={classes.root}>
      <Grid>
        <Grid item xs>
          <Avatar className={classes.orange}>{props.player.surname[0] + props.player.name[0]}</Avatar>
        </Grid>
      </Grid>
    </div>
  )
}

/** Component specific styles */
const styles = makeStyles({
    root: {
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    orange: {
        color: deepOrange[500],
        backgroundColor: deepOrange[100],
    },
    purple: {
    color: deepPurple[500],
    backgroundColor: deepPurple[100],
    },
});

/** PropTypes */
Player2.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
}

export default Player2;