import React, { Component } from 'react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import PropTypes from 'prop-types';
import PlayerBO from '../../api/PlayerBO';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { MenuItem, FormControl, InputLabel, Select, Typography, Grid, Box} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import firebase from 'firebase/app';
import 'firebase/auth';

class CreatePlayer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            surname: "",
            name: "",
            team_PK_team: "",
            role: "",
            t_number: "",
        };
    }

    createPlayer = () => {

        let newplayer = new PlayerBO;
        newplayer.setID(1);
        newplayer.setsurname(this.state.playersurname);
        newplayer.setname(this.state.playername);
        newplayer.setTeamId(this.state.team_PK_team)
        newplayer.setrole(this.state.playerrole);
        newplayer.sett_number(this.state.playert_number);
        VolleytrainAPI.getAPI().addPlayer(newplayer);
    }

    handleClick = () => {
        VolleytrainAPI.getAPI().getAllPlayer()
    }

    render() {
        const {classes, dialogOpen, onClose } = this.props;
        const { createButtonDisabled} = this.state;


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
                            <Grid item xs={6}>
                                <Button color="extra" variant="outlined" onClick={this.handleTrainingTime}><AddIcon />Spieler löschen</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}