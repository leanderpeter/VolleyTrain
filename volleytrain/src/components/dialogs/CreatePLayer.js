import { withStyles, Button, Dialog, DialogTitle, DialogContent, Box, FormControl, InputLabel, Typography, Grid, TextField, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import VolleytrainAPI from '../../api/VolleytrainAPI';
import PlayerBO from '../../api/PlayerBO';

class CreatePlayer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            surname: "",
            name: "",
            team_PK_team: "",
            role: "",
            t_number: "",
            createButtonDisabled: false,
        };
    }

    handleChange = (e) => {
        this.setState({
            playername: e.target.value,
        })
    }

    createPlayer = () => {

        let newplayer = new PlayerBO;
        newplayer.setID(1);
        newplayer.setSurname(this.state.playersurname);
        newplayer.setName(this.state.playername);
        newplayer.setTeamId(this.state.team_PK_team)
        newplayer.setRole(this.state.playerrole);
        newplayer.setT_number(this.state.playert_number);
        VolleytrainAPI.getAPI().addPlayer(newplayer);
    }

    handleClick = () => {
        VolleytrainAPI.getAPI().getAllPlayer()
    }

    render() {
        const { classes, dialogOpen, onClose } = this.props;
        const { surname, name, teamId, role, t_number} = this.state;
    
        let title = 'Neuen Spieler erstellen';

        return(
            <div>
                <Dialog className={classes.root} open={dialogOpen} onClose={onClose} fullWidth={true} >
                    
                    <DialogTitle>
                    <Grid container>
                        <Grid item xs={4}>
                        <Button className={classes.border} onClick={onClose}><ArrowBackOutlinedIcon /></Button>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography color="primary">Neuen Spieler anlegen</Typography>
                        </Grid>
                        {console.log( surname, name, role, t_number)}
                    </Grid>
                    </DialogTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography color="primary">Name:</Typography>
                            </Grid>
                            <Grid className={classes.border} item xs={9}>
                                <TextField color="primary" onChange={this.handleChange} fullWidth/>
                            </Grid>
                         </Grid>
                         <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography color="primary">Nachname:</Typography>
                            </Grid>
                            <Grid className={classes.border} item xs={9}>
                                <TextField color="primary" onChange={this.handleChange} fullWidth/>
                            </Grid>
                         </Grid>
                         <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography color="primary">Trikot-Nummer:</Typography>
                            </Grid>
                            <Grid className={classes.border} item xs={9}>
                                <TextField color="primary" onChange={this.handleChange} fullWidth/>
                            </Grid>
                         </Grid>
                        <Typography variant="h6">Rolle</Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel required id="open-select-label">Entsprechende Rolle auswählen</InputLabel>
                                <Select
                                value={role}
                                onChange={this.handleChange3}
                                >
                                <MenuItem value={1}>Zuspieler</MenuItem>
                                <MenuItem value={2}>Mittelblocker</MenuItem>
                                <MenuItem value={3}>Libero</MenuItem>
                                <MenuItem value={4}>Diagonalspieler</MenuItem>
                                <MenuItem value={5}>Außenspieler</MenuItem>
                                </Select>
                            </FormControl>
                            <Button onClick={this.handleClose} color='primary'>       
                            Speichern
                            </Button>
                        <Button onClick={this.handleClose} color='secondary'>
                        Abbrechen
                        </Button>
                </Dialog>
            </div>
        );
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

export default withStyles(styles)(CreatePlayer);