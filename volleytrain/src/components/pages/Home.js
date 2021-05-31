import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    withStyles,
} from '@material-ui/core';
import Matchfield from '../Matchfield';


class Home extends Component {


    
    render() {
        const {classes} = this.props;

        return <div>
                

                    <Matchfield/>
                    
                
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
Home.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Home)