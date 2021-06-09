import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, makeStyles} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';


const DragStyle = {
    position: 'absolute',
    cursor: 'move',
};

function Player({ id, left, top, surname, name}){
  const classes = styles();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, left, top },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    }), [id, left, top]);
    if (isDragging) {
        return <div ref={drag}/>;
    }
  return(
    <div ref={drag} style={{...DragStyle, left, top }} role="Box" className={classes.root}>
      <Grid>
        <Grid item xs>
          <Avatar className={classes.orange}>{name[0] + surname[0]}</Avatar>
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
Player.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
}

export default Player;