import PropTypes from 'prop-types';
import {
    makeStyles,
    withStyles,
} from '@material-ui/core';
import field from './media/field.png';
import { forwardRef, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import Player from './Player';
import React, { useImperativeHandle } from 'react';

const DragStyles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
};

const Matchfield2= forwardRef(({PlayerList, PositionList}, ref) => {
    const classes = styles();
    
      const [boxes, setBoxes] = useState([]);
      const moveBox = useCallback((id, left, top) => {
          setBoxes(update(boxes, {
              [id]: {
                  $merge: { left, top },
              },
          }));
      }, [boxes, setBoxes]);
      const [, drop] = useDrop(() => ({
          accept: ItemTypes.BOX,
          drop(item, monitor) {
              const delta = monitor.getDifferenceFromInitialOffset();
              const left = Math.round(item.left + delta.x);
              const top = Math.round(item.top + delta.y);
              moveBox(item.id, left, top);
              console.log(item.id, left, top)
              return undefined;
          },
      }), [moveBox]);
  
    useImperativeHandle(ref, () => ({

      addPlayer(playerID) {
        playerID = playerID - 1
        if (PlayerList[playerID].top === null){
          PlayerList[playerID].left = Math.floor(Math.random() * 200);
          PlayerList[playerID].top = Math.floor(Math.random() * 200);
        }
        setBoxes([...boxes, PlayerList[playerID]])
      }
  
    }));
    return (
      <div>
        <div ref={drop} className={classes.box}>
          <img src={field} alt="Field" className={classes.field}/>
          {Object.keys(boxes).map((key) => {
            const { left, top, name, surname } = boxes[key];
            return (<Player id={key} left={left} top={top} surname={surname} name={name}>
              
              </Player>);
            })}
        </div>
        <p>
		</p>
      </div>
      );
})


/** Component specific styles */
const styles = makeStyles({
    root: {
        flexGrow: 1,
        //margin: theme.spacing(2)
    },
    box: {
      height: '90%',
      width: '90%',
      position: 'relative',
      //border: '1px solid black',
      
  },
    field: {
        height: '100%',
        width: '100%',
        position: 'relative',
        border: '1px solid black',
        
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