import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography
} from '@material-ui/core';
import Exercises from '../Exercises';
import TeamOverview from './TeamOverview';


class Home extends Component {


    
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Exercises/>
            </div>
        )
    }
}


/** Component specific styles */
const styles = theme => ({
    root: {
        marginLeft: '240px',
        //paddingRight: '240px',
    },
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