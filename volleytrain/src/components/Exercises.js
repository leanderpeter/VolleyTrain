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
import { PositionHandler } from './MatchfieldHandler/PositionHandler';
import LoadingProgress from './dialogs/LoadingProgress';


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

    // init state for resources MatchfieldPlayerBO
    const [MatchfieldPlayers, setMatchfieldPlayers] = useState([])

    // Init states player Positions
    //const [playerPositions, setPlayerPositions] = useState(posPlayer);
    

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

    //PosPlayer State
    var posPlayer = PositionHandler(MatchfieldPlayers, Players, dimensions)


    // init styling
    const classes = styles();

    const setVisible = (playerID) => {
        var i;
        for (i=0; i < posPlayer.length; i++){
            if (posPlayer[i].id === playerID){
                posPlayer[i].visible = false
            }
        }
        //setPlayerPositions(posPlayer)
    }


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

    if (LoadingProgress){

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
                        <div className={classes.wrapper}>
                            <div className={classes.above} ref={divRef} >
                                <Matchfield2  PlayerList={[]}/>
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
                                <Button onClick={() => {childRef.current.addPlayer(player.id); setVisible(player.id)}} className={classes.playerButton}>
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
        );} else {

        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }
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
    },
    box: {
        height: '90%',
        width: '90%',
        position: 'relative',
        //border: '1px solid black',
        
    },
      field: {
          height: '100%',
          width: '100%',
          position: 'relative',
          border: '1px solid black',
          
    }
}); 



export default Exercises;