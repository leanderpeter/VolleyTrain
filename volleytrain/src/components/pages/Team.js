import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
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
    Container, Divider
} from '@material-ui/core';
import TeamOverview from './TeamOverview';


class Team extends Component {

    constructor(props){
        super(props)

        this.state = {
            team: this.props.location.state.team
        }
    }

    
    render() {
        const {classes} = this.props;
        const {team} = this.state

        return (
            <div>
                <Grid spacing={3} container direction="row" justify="center" className={classes.border}>
                    
                        <Grid item xs={7}>
                            <Typography>{team.getname()}</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                            <Typography>Traingszeiten</Typography>
                            <Typography>Mittwoch 10.00 - 13.00 Uhr</Typography>
                            <Typography>Dienstag 10.00 - 13.00 Uhr</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>Traingsdauer</Typography>
                            <Typography>3 Stunde(n)</Typography>
                            <Typography>3 Stunde(n)</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={1} />
                        <Grid item xs={3}>
                            <Typography>Verwalten</Typography>
                            <Typography>... aktuelles Team bearbeiten</Typography>
                            <Typography>... aktuelles Team löschen</Typography>
                        </Grid>
                </Grid>
            </div>
        )
    }
}


/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        width: '80%',
        marginLeft: '20%',
    },
    link: {
        textDecoration: 'None',
    },
    border: {
        margin: theme.spacing(2),
        width: '80%',
        marginLeft: '20%',
        border: '2px solid #BFCE0D',
        boxSizing: 'border-box',
        alignItems: 'center',
        textAlign: 'left',
        boxShadow: '0px 4px 10px rgba(84, 78, 78, 0.2)',
        borderRadius: '9px',
        background: '#fcfcfc',
        width: "80%",
        
    },
    papes: {
        background: 'linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)',
        borderRadius: '9px',
        fontWeight: 'bold',
        fontVariant: 'normal',
        color: '#ffffff',
        alignItems: 'center',
        textAlign: 'center',
        width: theme.spacing(26),
        height: theme.spacing(18),
    },
    button: {
        color: '#ffffff',
        background: 'linear-gradient(90.46deg, #FFD542 12.09%, #FFB676 104.14%)',
        borderRadius: '9px',
        fontWeight: 'bold',
        fontVariant: 'normal',
    },
});

/** PropTypes */
Team.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Team)