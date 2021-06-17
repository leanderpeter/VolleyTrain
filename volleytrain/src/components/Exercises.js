import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Typography,
    makeStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import PlayerButton from './PlayerButton';
import VolleytrainAPI from '../api/VolleytrainAPI';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd';
import Matchfield2 from './Matchfield2';
import arrow_n from './media/arrow_n.png'
import arrow_l from './media/arrow_l.png'
import arrow_r from './media/arrow_r.png'
import Player from './Player';


const Exercises = ({Players, MatchfieldID}) => {
    // In order to gain access to the child component instance,
    // you need to assign it to a `ref`, so we call `useRef()` to get one
    const childRef = useRef();

    // init rating state
    const [rating, setRating] = useState(0)

    // Init states for resources from Backend Players
    const [players, setPlayers] = useState(Players);
    const [error, setError] = useState(null);
    const [loadingInProgress, setLoadingInProgress] = useState(null);

    // init state for resources MatchfieldPlayerBO
    const [MatchfieldPlayers, setMatchfieldPlayers] = useState([])

    var player_key_array = []
    var i;
    for (i=0; i < MatchfieldPlayers.length; i++){
        player_key_array.push(MatchfieldPlayers[i]._player_pk)
    }

    var posPlayer = []

    if (MatchfieldPlayers.length > 0 && Players.length > 0 && player_key_array.length > 0){
        var i;
        for (i=0; i < Players.length; i++){
            var j;
            for (j=0; j < MatchfieldPlayers.length; j++){
                if (Players[i].id == MatchfieldPlayers[j]._player_pk){
                    //"Here we concat given players with given positions"
                    // create a player object with matchfield positions and push it into the player array
                    const obj = {
                        id:Players[i].id,
                        surname:Players[i].surname,
                        name:Players[i].name,
                        team:Players[i].team,
                        top:Math.floor(MatchfieldPlayers[j].top),
                        left:Math.floor(MatchfieldPlayers[j].left),
                        visible:false,
                    }
                    posPlayer.push(obj)
                } else if (!(player_key_array.includes(Players[i].id))){
                    //"Here we check if theres a Player id without a position"
                    // create a player object with random positions and push it into the player array
                    const obj = {
                        id:Players[i].id,
                        surname:Players[i].surname,
                        name:Players[i].name,
                        team:Players[i].team,
                        top:Math.random(),
                        left:Math.random(),
                        visible:false,
                    }
                    // add the playerId to the player_key_array
                    player_key_array.push(Players[i].id)
                    posPlayer.push(obj)
                }
            }
        }
    }

    // init styling
    const classes = styles();

    // get all Matchfield_Player_Position Data
    const getMatchfieldPlayers = (id) => {
        VolleytrainAPI.getAPI().getPlayerByMatchfieldID(id).then(
            MatchfieldPlayerBOs => {
                setMatchfieldPlayers(MatchfieldPlayerBOs)
                setLoadingInProgress(false)
                setError(null)
            }
        )
        .catch(e => {
            setMatchfieldPlayers([])
            setLoadingInProgress(false)
            setError(e)
        })
        // setze laden auf wahr
        setLoadingInProgress(true)
        setError(null)
    }
    
    useEffect(() => {
        getMatchfieldPlayers(MatchfieldID);
    }, []);

    return (
    <div>
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
                    <div>
                        <Matchfield2 ref={childRef} PlayerList={posPlayer}/>
                    </div>     
                              
                </Grid>
                
                <Grid item xs={2}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                <Typography variant="h6">Uebung bewerten:</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {setRating(newValue);}}
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
                {posPlayer.length > 0 ?
                    <>
                    {posPlayer.map(player => 
                        <div className="test_player">
                            <Button onClick={() => childRef.current.addPlayer(player.id)} className={classes.playerButton}>
                                <PlayerButton key={player.id} player={player}/>
                            </Button>
                        </div>
                    )}
                    </>
                    :
                    console.log("No info")
                }
                </Grid>
                <Typography variant="subtitle2">Linien:</Typography>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                        <img src={arrow_n} className={classes.arrow}/>
                        <Typography variant="subtitle2">Ballweg</Typography>
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                        <img src={arrow_l} className={classes.arrow}/>
                        <Typography variant="subtitle2">Laufweg</Typography>
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                        <img src={arrow_r} className={classes.arrow}/>
                        <Typography variant="subtitle2">Rotation</Typography>
                    </Grid>
                <Typography variant="subtitle2">Objekte:</Typography>
                </Grid>
            </Grid>
        </div>
        </DndProvider>
    </div>
    );
  };

/** Function specific styles */
const styles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: '240px',
    },
    test_player: {
        height: '45px',
        width: '50px',
    },
    paper: {
        padding: 2,
        textAlign: 'center',
        color: "black"
    },
    playerButton: {
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    arrow: {
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    }
});



export default Exercises;