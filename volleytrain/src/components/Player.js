import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, withStyles} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

class Player extends Component {

    //gebe einen leeren status
    constructor(props) {
        super(props);
        this.state = {
            player: props.player,
        };
    }

    
    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
    }


    componentWillUnmount() {
    }

    componentDidUpdate() {
    }




    /** Renders the component */
    render() {
        const {classes} = this.props;
        // Use the states projekt
        const {player} = this.state;

        return (
            <div className={classes.root}>
                <Grid spacing={2}>
                    <Grid item xs>
                        <Avatar className={classes.orange}>{player.getSurname()[0] + player.getname()[0]}</Avatar>
                    </Grid>
                </Grid>
                
            </div>
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    },
});

/** PropTypes */
Player.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(Player);