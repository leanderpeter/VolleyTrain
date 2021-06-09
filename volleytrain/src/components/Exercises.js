import React, {useRef, useState, useEffect} from 'react';
import Child from './Child'
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



const Exercises = () => {
    // In order to gain access to the child component instance,
    // you need to assign it to a `ref`, so we call `useRef()` to get one
    const childRef = useRef();

    // Init states for resources from Backend
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [loadingInProgress, setLoadingInProgress] = useState(null);

    // init styling
    const classes = styles();

    //Mock players
    const PlayerList = [
        //    y         x
        {top: 5, left: 100, title: 'LP'},
        {top: 45, left: 100, title: 'ERM'},
        {top: 85, left: 100, title: 'WB'},
        {top: 125, left: 100, title: 'JB'},
        {top: null, left: null, title: 'SM'},
        {top: null, left: null, title: 'ME'},
        {top: null, left: null, title: 'JS'},
        {top: null, left: null, title: 'SP'},
    ]

    // PlayersInMatchfield Mock
    var PlayersInMatchfield = [
        {PlayerID: 1, PositionID: 1},
        {PlayerID: 2, PositionID: 2},
        {PlayerID: 3, PositionID: 3},
        {PlayerID: 4, PositionID: 4},
    ]

    // Positions Mock
    var Positions = [
        // positionid top  left
        {PositionID: 1, top: 30, left: 200},
        {PositionID: 2, top: 60, left: 100},
        {PositionID: 3, top: 0, left: 0},
        {PositionID: 4, top: 160, left: 800},
        {PositionID: 5, top: 360, left: 300},
        {PositionID: 6, top: 860, left: 450},
    ]

    //combine the jsons Position and PlayersInMatchfield
    var posXPlayer = PlayersInMatchfield.map(x => Object.assign(x, Positions.find(y => y.PositionID == x.PositionID)));    
    console.log(posXPlayer)

    console.log(players)
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
    useEffect(() => {
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
                        <Matchfield2 ref={childRef} PlayerList={PlayerList} PositionList={Positions}/>
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
                {players.length > 0 ?
                    <>
                    {players.map(player => 
                        <div className="test_player">
                            <Button onClick={() => childRef.current.addPlayer(player.getID())} className={classes.playerButton}>
                                <PlayerButton key={player.getID()} player={player}/>
                            </Button>
                        </div>
                    )}
                    </>
                    :
                    console.log("No info")
                }
                </Grid>
                <Typography variant="subtitle2">Linien:</Typography>
                <Button onClick={() => childRef.current.addPlayer(1)}>Click me</Button>
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
    }
});



export default Exercises;