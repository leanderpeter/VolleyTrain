import { withStyles, Button, Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import PLayerBO from '../../api/PlayerBO';

class CreatePlayer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            dialogOpen: null,
            surname: "",
            name: "",
            role: "",
            t_number: "",
        }
    }

    createPlayer = () => {

        let player = new PlayerBO;
        player.setID(1);
        player.setsurname(this.state.playersurname);
        player.setname(this.state.playername);
        player.setrole(this.state.playerrole);
        player.sett_number(this.state.playert_number);
        VolleytrainAPI.getAPI().addPlayer(player);
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
                        <Typography color="primary">Neuen Spieler hinzufügen</Typography>
                        </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography color="primary">Name:</Typography>
                            </Grid>
                            <Grid className={classes.border} item xs={9}>
                                <TextField color="primary" onChange={this.handleChange} fullWidth/>
                            </Grid>
                            {createButtonDisabled ? 
                            <Grid item xs={6}> 
                                <Button color="extra" variant="outlined" onClick={this.saveTrainingday}><SaveAltIcon />Spieler speichern</Button>
                            </Grid>
                            :
                            <Grid item xs={6}> 
                                <Button color="extra" variant="outlined" onClick={this.handleTrainingTime}><AddIcon />Spieler hinzufügen</Button>
                            </Grid>
                            }
                            <Grid item xs={6}>
                                <Button disabled={createButtonDisabled} className={classes.button} fullWidth onClick={this.createTeam}>Spieler erstellen</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}