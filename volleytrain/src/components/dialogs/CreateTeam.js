import { withStyles, Button, Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import TrainingTime from '../assets/TrainingTime';
import TeamBO from '../../api/TeamBO';
import TrainingdayBO from '../../api/TrainingdayBO';

class CreateTeam extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            dialogOpen: null,
            teamname: "",
            weekday: "",
            trainingdays: 0,
            trainingday: "",
            addDayOne: null,
            addDayTwo: null,
            addDayThree: null,
            createButtonDisabled: false,
            starttime: null,
            endtime: null
        }
    }

    handleChange = (e) => {
        this.setState({
            teamname: e.target.value,
        })
    }

    createTeam = () => {

        let team = new TeamBO;
        team.setID(1);
        team.setname(this.state.teamname);
        team.setTrainingsday(this.state.trainingday);
        team.setAddDayOne(this.state.addDayOne);
        team.setAddDayTwo(this.state.addDayTwo);
        team.setAddDayThree(this.state.addDayThree);
        VolleytrainAPI.getAPI().addTeam(team);
    }

    saveTrainingday = () => {
        this.setState({
            createButtonDisabled: false,
        })

        let trainingday = new TrainingdayBO;
        trainingday.setID(1);
        trainingday.setWeekday(this.state.weekday);
        trainingday.setStarttime(this.state.starttime);
        trainingday.setEndtime(this.state.endtime);
        VolleytrainAPI.getAPI().addTrainingday(trainingday);
        console.log(trainingday);
    }

    handleTrainingTime = () => {
        let timeHandler = this.state.trainingdays += 1;
        
        this.setState({
            trainingdays: timeHandler,
            createButtonDisabled: true
        })
    }

    handleTrainingDay = (e) => {
        this.setState({
            trainingday: e.target.value,
            weekday: e.target.weekday,
            starttime: e.target.starttime,
            endtime: e.target.endtime
        })
    }

    handleAddDayOne = (e) => {
        this.setState({
            addDayOne: e.target.value
        })
    }

    handleAddDayTwo = (e) => {
        this.setState({
            addDayTwo: e.target.value
        })
    }

    handleAddDayThree = (e) => {
        this.setState({
            addDayThree: e.target.value
        })
    }

    handleClick = () => {
        VolleytrainAPI.getAPI().getAllTeams()
    }

    render() {
        const {classes, dialogOpen, onClose } = this.props;
        const { createButtonDisabled, trainingdays, weekday, starttime, endtime } = this.state;


        return(
            <div>
                <Dialog className={classes.root} open={dialogOpen} onClose={onClose}>
                    
                    <DialogTitle>
                    <Grid container>
                        <Grid item xs={4}>
                        <Button className={classes.border} onClick={onClose}><ArrowBackOutlinedIcon /></Button>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography color="primary">Neues Team erstellen</Typography>
                        </Grid>
                        {console.log( weekday, starttime, endtime)}
                    </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography color="primary">Teamname:</Typography>
                            </Grid>
                            <Grid className={classes.border} item xs={9}>
                                <TextField color="primary" onChange={this.handleChange} fullWidth/>
                            </Grid>
                            {trainingdays >= 1 ? 
                            <Grid item xs={12}>
                                <TrainingTime onChange={this.handleTrainingDay} value={weekday} weekday={weekday} starttime={starttime} endtime={endtime} />  
                            </Grid>
                            : null}
                            {trainingdays >= 2 ? 
                            <Grid item xs={12}>
                                <TrainingTime onChange={this.handleAddDayOne} value={weekday} weekday={weekday} starttime={starttime} endtime={endtime} /> 
                            </Grid>
                            : null}
                            {trainingdays >= 3 ? 
                            <Grid item xs={12}>
                                <TrainingTime onChange={this.handleAddDayTwo} value={weekday}/> 
                            </Grid>
                            : null}
                            {trainingdays >= 4 ?
                                <Grid item xs={12}>
                                    <TrainingTime onChange={this.handleAddDayThree} value={weekday}/> 
                                </Grid>
                            : null}
                            {createButtonDisabled ? 
                            <Grid item xs={6}> 
                                <Button color="extra" variant="outlined" onClick={this.saveTrainingday}><SaveAltIcon />Trainingszeit speichern</Button>
                            </Grid>
                            
                            : 
                            <Grid item xs={6}> 
                                <Button color="extra" variant="outlined" onClick={this.handleTrainingTime}><AddIcon />Trainingszeit hinzufügen</Button>
                            </Grid>
                            }
                            <Grid item xs={6}>
                                <Button disabled={createButtonDisabled} className={classes.button} fullWidth onClick={this.createTeam}>Team erstellen</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>      
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

export default withStyles(styles)(CreateTeam);