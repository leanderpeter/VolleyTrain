import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    withStyles,
} from '@material-ui/core';
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

        return <div className={classes.root}>
                <Typography>TESTEST</Typography>
                <img onDragStart={this.preventDragHandler} src={field} alt="Field" className={classes.field}/>
            </div>
    }
}

/** Component specific styles */
const styles = theme => ({
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
Matchfield.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Matchfield)