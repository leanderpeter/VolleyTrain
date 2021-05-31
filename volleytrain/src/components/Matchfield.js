import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    withStyles,
} from '@material-ui/core';

class Matchfield extends Component {

    render() {
        const {classes} = this.props;

        return <div>
                <Typography style={{marginTop: "2em"}} classlname={classes.root} align=''>Lets code the hell out of this Bitch!</Typography>
            </div>
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    formControl: {
        minWidth: 180
    },
    form: {
        marginTop: theme.spacing(1)
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