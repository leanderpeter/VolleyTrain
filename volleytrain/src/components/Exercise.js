import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    withStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Matchfield from './Matchfield';
import Rating from '@material-ui/lab/Rating';
import Player from './Player';
import Draggable from 'react-draggable';
import VolleytrainAPI from '../api/VolleytrainAPI';


class Exercise extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: [],
            error: null,
            loadingInProgress: null
        }
    }
    getPlayer = () => {
        VolleytrainAPI.getAPI().getPlayers()
          .then(playerBOs =>{
            this.setState({								//neuer status wenn fetch komplett
              players: playerBOs,
              loadingInProgress: false,				// deaktiviere ladeindikator
              error: null,
            })}).catch(e =>
              this.setState({
                players: [],
                loadingInProgress: false,
                error: e
              }));
        // setze laden auf wahr
        this.setState({
          loadingInProgress: true,
          error: null
        });
    }

    componentDidMount(){
        this.getPlayer()
    }
      

    render() {
        const {classes} = this.props;
        const {players} = this.state;
        console.log(this.state.players)
        return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={10} 
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ borderRight: '0.2em solid black', padding: '0.5em' }}>
                <Matchfield/>
                </Grid>
                
                <Grid item xs={2}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                <Typography variant="h6">Uebung bewerten:</Typography>
                <Rating
                    name="simple-controlled"
                    value={3}
                    onChange={(event, newValue) => {}}
                    size="large"
                    />
                <Typography variant="h6">Feldelemente:</Typography>
                <Typography variant="subtitle2">Spieler:</Typography>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify=""
                    alignItems="center">
                
                {players.length > 0 ?
                    <>
                    {players.map(player => 
                    
                    <Draggable
                        handle=".test_player"
                        //defaultPosition={{x: 633, y: -210}}
                        position={null}
                        grid={[5, 5]}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>
                        <div className="test_player">
                            <Player key={player.getID()} player={player}/>
                        </div>
                    </Draggable>
                    
                    )}
                    </>
                    :
                    null
                }
            


                </Grid>
                <Typography variant="subtitle2">Linien:</Typography>
                <Typography variant="subtitle2">Objekte:</Typography>
                </Grid>
            </Grid>
        </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    test_player: {
        height: '45px',
        width: '50px',
    },
    test_field: {
        height: '300px',
        width: '900px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

/** PropTypes */
Exercise.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(Exercise)