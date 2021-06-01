import { withStyles, Button, Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import AddIcon from '@material-ui/icons/Add';
import KeyboardTimePicker from '@material-ui/pickers';
import VolleytrainAPI from '../../api/VolleytrainAPI';

class CreateTeam extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            dialogOpen: null,
            teamname: "",
            weekdays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
            selectedDay: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            teamname: e.target.value,
        })
    }

    handleDayChange = (e) => {
        this.setState({
            selectedDay: e.target.value,
        })
    }

    handleClick = () => {
        VolleytrainAPI.getAPI().getAllTeams()
    }

    render() {
        const {classes, dialogOpen, onClose} = this.props;


        return(
            <div>
                <Dialog className={classes.root} open={dialogOpen} onClose={onClose}>
                    
                    <DialogTitle>
                    <Grid container>
                        <Grid item xs={4}>
                        <Button><ArrowBackOutlinedIcon color="primary" onClick={onClose}/></Button>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography color="primary">Neues Team erstellen</Typography>
                        </Grid>
                    </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography color="primary">Teamname:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" color="primary" label="Dein Team" onChange={this.handleChange} fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="primary">Wochentag:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select label="Wochentag wählen" variant="outlined" onChange={this.handleDayChange} value={this.state.selectedDay} label="Wochentag wählen ..." fullWidth>
                                    {this.state.weekdays.map((day) => (
                                        <MenuItem value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={3}>
                                <Typography color="primary">Beginn:</Typography>
                            </Grid>
                            <Grid item xs={3}>
{/*                                 <KeyboardTimePicker variant="outlined" onChange={this.handleTimeChange} value={this.state.time} fullWidth />
 */}                                
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={3}>
                                <Typography color="primary">Ende:</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Select variant="outlined" onChange={this.handleTimeChange} value={this.state.time} fullWidth>
                                {this.state.weekdays.map((day) => (
                                        <MenuItem value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <Button><AddIcon />Trainingszeit hinzufügen</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="secondary" fullWidth onClick={this.handleClick}>Team erstellen</Button>
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
    
  });

export default withStyles(styles)(CreateTeam);