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


const Exercises = () => {
    // In order to gain access to the child component instance,
    // you need to assign it to a `ref`, so we call `useRef()` to get one
    const childRef = useRef();

    // Init states for resources from Backend Players
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [loadingInProgress, setLoadingInProgress] = useState(null);

    // init state for resources MatchfieldPlayerBO
    const [MatchfieldPlayers, setMatchfieldPlayers] = useState([])

    // init state for resources Position Data
    const [Positions, setPositions] = useState([])

    //combine the jsons MatchfieldPlayers and Players
    var combi = MatchfieldPlayers.map(x => Object.assign(x, players.find(y => y.id == x._player_pk)));
    //combine the jsons Combi and Positions
    var PlayerData = combi.map(x => Object.assign(x, Positions.find(y => y.id == x._position_pk)));

    var i;
    var posPlayer = [];
    //check if data is loaded
    if (MatchfieldPlayers.length > 0 && players.length > 0){
        for (i = 0; i < PlayerData.length; i++) {
            const obj = {
                top: Math.floor(PlayerData[i].top),
                left: Math.floor(PlayerData[i].left),
                name: PlayerData[i].name,
                surname: PlayerData[i].surname,
                id: PlayerData[i].id,
            }
            posPlayer.push(obj)
        }
    }
    

    // init styling
    const classes = styles();

    const getPlayers = () => {
        VolleytrainAPI.getAPI().getPlayers().then(
            playerBOs => {
                setPlayers(playerBOs)
                setLoadingInProgress(false)
                setError(null)
            }
        ).catch(e => {
            setPlayers([])
            setLoadingInProgress(false)
            setError(e)
        })
        // setze laden auf wahr
        setLoadingInProgress(true)
        setError(null)
    }

    // get all Matchfield_Player_Position Data
    const getMatchfieldPlayers = () => {
        VolleytrainAPI.getAPI().getAllMatchfieldPlayerBO().then(
            MatchfieldPlayerBOs => {
                setMatchfieldPlayers(MatchfieldPlayerBOs)
                setLoadingInProgress(false)
                setError(null)
            }
        ).catch(e => {
            setMatchfieldPlayers([])
            setLoadingInProgress(false)
            setError(e)
        })
        // setze laden auf wahr
        setLoadingInProgress(true)
        setError(null)
    }

    //get all position Data
    const getPosition = () => {
        VolleytrainAPI.getAPI().getAllPositions().then(
            positionBOS => {
                setPositions(positionBOS)
                setLoadingInProgress(false)
                setError(null)
            }
        ).catch(e => {
            setPositions([])
            setLoadingInProgress(false)
            setError(e)
        })
        // setze laden auf wahr
        setLoadingInProgress(true)
        setError(null)
    }
    
    useEffect(() => {
        getMatchfieldPlayers();
        getPosition()
        getPlayers();
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