import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
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


const Exercises = ({Players, MatchfieldID}) => {
    // In order to gain access to the child component instance,
    // you need to assign it to a `ref`, so we call `useRef()` to get one
    const childRef = useRef();
    const divRef = useRef();

    // init rating state
    const [rating, setRating] = useState(null)

    // Init states for resources from Backend Players
    const [players, setPlayers] = useState(Players);
    const [error, setError] = useState(null);
    const [loading, setLoadingInProgress] = useState(null);

    // init loading state for matchfield
    const [playerLoading, setPlayerLoadingInProgress] = useState(true);

    // init state for resources MatchfieldPlayerBO
    const [MatchfieldPlayers, setMatchfieldPlayers] = useState([])

    const [height, setHeight] = useState(0)


    // getting the dimensions of matchfield compoent
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    
    useLayoutEffect(() => {
        if (divRef.current) {
        setDimensions({
            width: divRef.current.offsetWidth,
            height: divRef.current.offsetHeight
        });
        }
    }, []);
    

    console.log(dimensions)
    
    var posPlayer = []
    if (MatchfieldPlayers.length > 0 && Players.length > 0 && dimensions.width > 0){

        /**
         * In this for loop we fill the array @player_key_array with all
         * the Player IDs from the MatchfieldPlayers (Position Object)
         * to later determine if a player already has a position object
         */
        var player_key_array = []
        var s;
        for (s=0; s < MatchfieldPlayers.length; s++){
            player_key_array.push(MatchfieldPlayers[s]._player_pk)
        }

        /**
         * In this 2 for loops we first iterate over all @Players
         * In the nested loop we iterate over @MatchfieldPlayers and check 
         * if theres a Position in @MatchfieldPlayers for @Players.
         * if so we create a PlayerXPosition Object
         * if not we create a PlayerXPosition Object with random positions
         */

        var i;
        for (i=0; i < Players.length; i++){
            var j;
            for (j=0; j < MatchfieldPlayers.length; j++){
                if (Players[i].id == MatchfieldPlayers[j]._player_pk){
                    //"Here we concat given players with given positions"
                    // create a player object with matchfield positions and push it into the player array
                    console.log(MatchfieldPlayers[j].top)
                    const obj = {
                        id:Players[i].id,
                        surname:Players[i].surname,
                        name:Players[i].name,
                        team:Players[i].team,
                        top:parseFloat(MatchfieldPlayers[j].top)*dimensions.height,
                        left:parseFloat(MatchfieldPlayers[j].left)*dimensions.width,
                        visible:false,
                    }
                    console.log(obj)
                    posPlayer.push(obj)
                } else if (!(player_key_array.includes(Players[i].id))){
                    //"Here we check if theres a Player id without a position"
                    // create a player object with random positions and push it into the player array
                    const obj = {
                        id:Players[i].id,
                        surname:Players[i].surname,
                        name:Players[i].name,
                        team:Players[i].team,
                        top:null,
                        left:null,
                        visible:true,
                    }
                    // add the playerId to the player_key_array
                    player_key_array.push(Players[i].id)
                    posPlayer.push(obj)
                }
            }
        }
        // loading finished
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
                    <div ref={childRef} className={classes.wrapper}>
                        <div className={classes.above} ref={divRef}>
                            <Matchfield2 PlayerList={[]}/>
                        </div>
                        <div className={classes.under}>
                            <Matchfield2 ref={childRef} PlayerList={posPlayer}/>
                        </div>
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
                            {player.visible ? 
                            <Button onClick={() => childRef.current.addPlayer(player.id)} className={classes.playerButton}>
                                <PlayerButton key={player.id} player={player}/>
                            </Button>
                            : null}
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
    },
    wrapper:{
        position: "relative",
    },
    above:{
        position: "absolute",
        top: 0,
        right: 0,
    }
}); 



export default Exercises;