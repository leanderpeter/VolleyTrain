import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {
    Card,
    Button,
    Grid,
    Typography,
    withStyles,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Container
} from '@material-ui/core';


class Home extends Component {


    
    render() {
        const {classes} = this.props;

        return <div>
                

                    <Typography style={{marginTop: "2em"}} classlname={classes.root} align='center'>Lets code the hell out of this Bitch!</Typography>
                    
                
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