import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
} from '@material-ui/core';
import Draggable from 'react-draggable';
import test_player from './media/player_test.png';
import field from './media/field.png';

class Matchfield extends Component {


    preventDragHandler = (e) => {
        e.preventDefault();
      }

    handleStop = (pos) => {
        console.log(pos.screenX)
        console.log(pos.screenY)
    }

    render() {
        const {classes} = this.props;

        return <div>

            <img onDragStart={this.preventDragHandler} src={field} alt="Field" className={classes.test_field}/>
                <Draggable
                        handle=".test_player"
                        defaultPosition={{x: 321, y: -190}}
                        position={null}
                        grid={[5, 5]}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div className="test_player">
                        <img onDragStart={this.preventDragHandler} src={test_player} alt="Player_1" className={classes.test_player}/>
                        </div>
                </Draggable>
                <Draggable
                        handle=".test_player"
                        defaultPosition={{x: 633, y: -210}}
                        position={null}
                        grid={[5, 5]}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div className="test_player">
                        <img onDragStart={this.preventDragHandler} src={test_player} alt="Player_1" className={classes.test_player}/>
                        </div>
                </Draggable>
            </div>
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    test_player: {
        height: '45px',
        width: '50px',
    },
    test_field: {
        height: '430px',
        width: '900px',
        
    }
});

/** PropTypes */
Matchfield.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Matchfield)