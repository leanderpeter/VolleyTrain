import { withStyles, Button, Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, Select, MenuItem, Divider } from '@material-ui/core';
import React from 'react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import TrainingTime from '../assets/TrainingTime';
import TeamBO from '../../api/TeamBO';


class CreateTeam extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            teamname: "",
            showOptions: false,
            teamDisabled: false,
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
        team.setName(this.state.teamname);
        team.setTrainer(2)
        VolleytrainAPI.getAPI().addTeam(team);

        this.setState({
            showOptions: true,
            teamDisabled: true
        })
    }

    componentWillUnmount() {
        VolleytrainAPI.getAPI().getAllTeams()
    }

    render() {
        const {classes, dialogOpen, onClose } = this.props;
        const { teamname, teamDisabled, showOptions } = this.state;


        return(
            <div>
                <Dialog className={classes.root} open={dialogOpen} onClose={onClose}>
                    
                    <DialogTitle>
                    <Grid container>
                        <Grid item xs={4}>
                            <Button className={classes.backButton} onClick={onClose}><ArrowBackOutlinedIcon className={classes.backButton} color="primary" /></Button>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography variant="h5" color="primary"><b>Neues Team erstellen</b></Typography>
                        </Grid>
                    </Grid>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid className={classes.border} item xs={8}>
                                <TextField disabled={teamDisabled} label="Teamname" color="primary" value={teamname} onChange={this.handleChange} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <Button disabled={teamDisabled} className={classes.button} onClick={this.createTeam} fullWidth>{teamDisabled ? "Team erstellt!" : "Team erstellen"}</Button>
                            </Grid>
                            {showOptions ? 
                                <TrainingTime teamname={teamname} />
                            : null}
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
    backButton: {
        borderRadius: '500px'
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