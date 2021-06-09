import { withStyles, Card, Paper, CardContent, Button, Typography, Grid } from '@material-ui/core';
import React from 'react';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import CreateTeam from '../dialogs/CreateTeam';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  import Team from './Team';

class TeamOverview extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            dialogOpen: false,
            teams: [],
            error: null,
            loadingInProgress: false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            dialogOpen: true
        })

    }

    getTeams = () => {
        VolleytrainAPI.getAPI().getAllTeams()
        .then(teamBOs =>
            this.setState({
                teams: teamBOs,
                error: null,
                loadingInProgress: false,
            })).catch(e =>
                this.setState({
                    teams: [],
                    error: e,
                    loadingInProgress: false,
                }));
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    componentDidMount() {
        this.getTeams();
    } 



    render() {
        const {classes} = this.props;
        const {dialogOpen, teams} = this.state;

        return(
            <div>
                <Grid spacing={3} container direction="row" justify="center" className={classes.root}>
                
                    {teams.map((teamBO) => (

                    
                        <Grid key={teamBO.getID()} item>
                            <Link to={{pathname: "/team", state: {team: teamBO}}} className={classes.link} team={teamBO}>
                                <Paper className={classes.papes}>
                                    <Typography>{teamBO.getname()}</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                    
                    <Grid item>
                        <Paper className={classes.border} variant="outlined" onClick={this.handleClickOpen} color="secondary">
                                <Button>Team erstellen</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <CreateTeam dialogOpen={dialogOpen} onClose={this.handleClose} />
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
        border: '2px solid #BFCE0D',
        boxSizing: 'border-box',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0px 4px 10px rgba(84, 78, 78, 0.2)',
        borderRadius: '9px',
        background: '#fcfcfc',
        width: theme.spacing(26),
        height: theme.spacing(18),
        
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

export default withStyles(styles)(TeamOverview);