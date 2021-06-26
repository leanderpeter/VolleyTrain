import React from 'react';
import {Button, Grid, Typography, MenuItem, Select, withStyles, TextField } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CheckIcon from '@material-ui/icons/Check';
import TrainingdayBO from '../../api/TrainingdayBO';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

class TrainingTime extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            weekdays: ["montags", "dienstags", "mittwochs", "donnerstags", "freitags", "samstags", "sonntags"],
            selectedDay: "",
            starttime: null,
            endtime: null,
            teamname: this.props.teamname,
            teamid: null,
            team: []
        }
    }

    saveTrainingday = () => {

        let trainingday = new TrainingdayBO;
        trainingday.setID(1);
        trainingday.setWeekday(this.state.selectedDay);
        trainingday.setStarttime(this.state.starttime);
        trainingday.setEndtime(this.state.endtime);
        trainingday.setTeam(this.state.teamid)
        VolleytrainAPI.getAPI().addTrainingday(trainingday);

        this.handleDeleteTime();
    }



    getCurrentTeam = () => {
        VolleytrainAPI.getAPI().getTeamByName(this.state.teamname)
        .then(teamBO => {
            this.setState({
                team: teamBO,
                teamid: teamBO.getID(),
                error: null
            })
        }).catch(e => {
            this.setState({
                team: [],
                teamid: null,
                error: e
            })
        });
        this.setState({
            error: null
        })
    }


    handleTrainingTime = () => {
        this.getCurrentTeam();
        
        this.setState({
            showTrainingtime: true
        })
    }

    handleDayChange = (e) => {
        this.setState({
            selectedDay: e.target.value,
        })
    }

    handleStarttimeChange = (e) => {
        this.setState({
            starttime: e.target.value
        })
    }

    handleEndtimeChange = (e) => {
        this.setState({
            endtime: e.target.value
        })
    }

    handleDeleteTime = () => {
        this.setState({
            selectedDay: "",
            starttime: "",
            endtime: "",
        })
    }

    componentDidMount() {
        this.getCurrentTeam()
    }


    render() {
        const {classes, onClose} = this.props
        const {weekdays, starttime, endtime, selectedDay, showTrainingtime, team, teamname, teamid} = this.state

        return(
            <div>

            {showTrainingtime ? 
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography color="primary">Wochentag:</Typography>
                    </Grid>
                            <Grid className={classes.border} item xs={3}>
                                <Select required onChange={this.handleDayChange} value={selectedDay} fullWidth>
                                    {weekdays.map((day) => (
                                        <MenuItem value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={3}>
                                <Typography color="primary">Beginn:</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.border}>
                                <TextField required type="time" onChange={this.handleStarttimeChange} value={starttime} fullWidth />
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={3}>
                                <Typography color="primary">Ende:</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.border}>
                                <TextField required type="time" onChange={this.handleEndtimeChange} value={endtime} fullWidth />
                            </Grid>

                            <Grid item xs={6} />
                            </Grid>
                            :
                                <Grid item xs={12}>
                                    <Typography>Team erstellt! Was möchtest du tun?</Typography> 
                                </Grid>}
                                <Grid item xs={1} />
                                <Grid item xs={5}>
                                    <Button className={classes.button} 
                                        onClick={showTrainingtime ? this.handleDeleteTime : this.handleTrainingTime}>
                                        {showTrainingtime ? "Trainingszeit löschen" : "Trainingszeit hinzufügen"}
                                    </Button>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button className={classes.button} onClick={showTrainingtime ? this.saveTrainingday : onClose }>{showTrainingtime ? "Trainingszeit speichern" : "Teams anzeigen"}</Button>
                                </Grid>
                                <Grid item xs={1} />
                         
            </div>
        )
    }

}

/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        width: '100%'
    },
    border: {
        border: '1px solid #3ECCA5',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 10px rgba(84, 78, 78, 0.2)',
        borderRadius: '9px',
        marginBottom: '15px',
        background: '#fcfcfc',
        
    },
    button: {
        color: '#ffffff',
        background: 'linear-gradient(90.46deg, #FFD542 12.09%, #FFB676 104.14%)',
        borderRadius: '9px',
        fontWeight: 'bold',
        fontVariant: 'normal',
    },
});

export default withStyles(styles)(TrainingTime);