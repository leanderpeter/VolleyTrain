import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    withStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Matchfield from './Matchfield';
import Rating from '@material-ui/lab/Rating';
import Player2 from './Player2';
import Draggable from 'react-draggable';
import VolleytrainAPI from '../api/VolleytrainAPI';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd';
import Thing from './Thing';
import LocalBox from './LocalBox';
import GlobalBox from './GlobalBox';
import Matchfield2 from './Matchfield2';

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
        console.log("Loading component")
        this.getPlayer()
    }
    
    render() {
        const {classes} = this.props;
        const {players} = this.state;
        return (
            <DndProvider backend={HTML5Backend}>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={1}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"/>
                <Grid item xs={9} 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ borderRight: '0.2em solid black', padding: '0.5em'}}>
                    <GlobalBox/>
                    <Matchfield2/>
                    
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
                        <Thing/>
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
                            <Player2 key={player.getID()} player={player}/>
                        </div>
                    </Draggable>
                    
                    )}
                    </>
                    :
                    console.log("No info")
                }
            


                </Grid>
                <Typography variant="subtitle2">Linien:</Typography>
                <Typography variant="subtitle2">Objekte:</Typography>
                </Grid>
            </Grid>
        </div>
        </DndProvider>
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