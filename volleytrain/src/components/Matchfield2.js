import React, {Component, useRef} from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    withStyles,
} from '@material-ui/core';
import field from './media/field.png';
import { useDrop } from "react-dnd";

function useLocalDrop(onDrop) {
    const ref = useRef();
  
    const [, dropTarget] = useDrop({
      accept: "thing",
      drop(item, monitor) {
        const offset = monitor.getSourceClientOffset();
        if (offset && ref.current) {
          const dropTargetXy = ref.current.getBoundingClientRect();
          onDrop("local", {
            x: offset.x - dropTargetXy.left,
            y: offset.y - dropTargetXy.top
          });
        }
      }
    });
  
    return elem => {
      ref.current = elem;
      dropTarget(ref);
    };
  }

function Matchfield2(props){
    const classes = styles();
    const ref = useLocalDrop(console.log);
    return (
        <div>
            <img src={field} ref={ref} alt="Field" className={classes.field}/>
        </div>
    )
}


/** Component specific styles */
const styles = makeStyles({
    root: {
        flexGrow: 1,
        //margin: theme.spacing(2)
    },
    field: {
        height: '90%',
        width: '90%',
        
    }
});

/** PropTypes */
Matchfield2.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Matchfield2)