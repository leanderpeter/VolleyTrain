import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useImperativeHandle,
  useReducer,
} from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import PlayerButton from "./PlayerButton";
import VolleytrainAPI from "../api/VolleytrainAPI";
//import Matchfield2 from './Matchfield2';
import arrow_n from "./media/arrow_n.png";
import arrow_l from "./media/arrow_l.png";
import arrow_r from "./media/arrow_r.png";
import {
  PositionHandler,
  PostPutHandler,
} from "./MatchfieldHandler/PositionHandler";
import LoadingProgress from "./dialogs/LoadingProgress";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Player from "./Player";
import field from "./media/field.png";
import LoadingComp from "./dialogs/LoadingComp";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const Exercises = ({ Players, MatchfieldID }) => {
  // force update handler
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  // delete PlayerID handler from child component
  // gets called in Player.js component
  const [PlayerDeleteId, setPlayerDeleteId] = useState(null);

  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const divRef = useRef();

  // init rating state
  const [rating, setRating] = useState(null);

  // Init states for resources from Backend Players
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoadingInProgress] = useState(null);

  // init state for resources MatchfieldPlayerBO
  const [MatchfieldPlayers, setMatchfieldPlayers] = useState([]);

  // Init states player Positions
  //const [playerPositions, setPlayerPositions] = useState(posPlayer);

  // getting the dimensions of matchfield compoent
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  /**
   * In this Layout effect we set the width and height of the
   * matchfield component. Width and height is used to set the players
   * because the position data comes normalized from the backend.
   *
   * Hint: Maybe redundant, see useEffect with forceUpdate below.
   */
  useLayoutEffect(() => {
    if (divRef.current) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  // init styling
  const classes = styles();

  /**
   * Set visibility of player to false
   * if PlayerDeleteId is changed
   */

  useEffect(() => {
    if (!(PlayerDeleteId == null)) {
      players[PlayerDeleteId].visibleOnSelection = true;
      setPlayers(players);
      forceUpdate();
    }
  }, [, PlayerDeleteId]);

  // get all Matchfield_Player_Position Data
  const getMatchfieldPlayers = (id) => {
    VolleytrainAPI.getAPI()
      .getPlayerByMatchfieldID(id)
      .then((MatchfieldPlayerBOs) => {
        setMatchfieldPlayers(MatchfieldPlayerBOs);
        setLoadingInProgress(false);
        setError(null);
        return MatchfieldPlayerBOs;
      })
      .then(function (MatchfieldPlayerBOs) {
        //PosPlayer State
        var posPlayer = PositionHandler(
          MatchfieldPlayerBOs,
          Players,
          dimensions
        );
        setPlayers(posPlayer);
      })
      .catch((e) => {
        //setMatchfieldPlayers([])
        setLoadingInProgress(false);
        setError(e);
      });
    // setze laden auf wahr
    setLoadingInProgress(true);
    setError(null);
  };

  // API Anbindung um MatchfieldPlayerPos über das Backend in die Datenbank upzudaten
  const updateMatchfieldPlayer = (matchfieldPlayer) => {
    VolleytrainAPI.getAPI()
      .updatePlayerPositions(matchfieldPlayer)
      .then((matchfieldPlayer) => {
        console.log(matchfieldPlayer);
      })
      .catch((e) => console.log(e));
  };

  // API Anbindung um das MatchfieldPlayerPos über das Backend in der Datenbank zu löschen
  const deletePlayerPosition = (pos) => {
    VolleytrainAPI.getAPI()
      .deletePlayerPositions(pos)
      .then(() => {
        console.log("delete");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveExercise = () => {
    var toBackend;
    //console.log(players);
    toBackend = PostPutHandler(
      MatchfieldPlayers,
      players,
      dimensions,
      MatchfieldID
    );
    // update all players that are on matchfield
    toBackend[1].forEach((obj) => {
      updateMatchfieldPlayer(obj);
    });
    // delete all players that are on matchfield
    toBackend[0].forEach((obj) => {
      deletePlayerPosition(obj);
    });

    //updateMatchfieldPlayer(infos[1][0]);
  };

  useEffect(() => {
    if (dimensions.width > 5) {
      getMatchfieldPlayers(MatchfieldID);
    }
  }, [, dimensions]);

  useEffect(() => {
    if (dimensions.width < 5) {
      forceUpdate();
      if (divRef.current) {
        setDimensions({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
        });
      }
    }
  });

  /**
   * Below here is only Matchfield function/logic
   *
   *
   *
   *
   *
   */

  // init loading state for placing players
  const [Playerloading, setPlayerLoading] = useState(true);

  // move players on matchfield
  const moveBox = useCallback(
    (id, left, top) => {
      setPlayers(update(players, { [id]: { $merge: { left, top } } }));
    },
    [players, setPlayers]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  const addPlayer = (playerID) => {
    players.forEach((player) => {
      if (player.id === playerID) {
        player.visibleOnSelection = false;
      }
    });
    setPlayers(players);
    forceUpdate();
  };

  useEffect(() => {
    // Runs after EVERY rendering
    PlacePlayersWithPosition(players);
    //PlaceVisiblePlayers(players);
  }, [, players]);

  const PlacePlayersWithPosition = (players) => {
    // placing players with position
    if (players.length > 0 && Playerloading) {
      setPlayerLoading(false);
      var PlayerWithPositions = [];
      var i;
      // this can be deleted
      for (i = 0; i < players.length; i++) {
        if (!(players[i].top == null)) {
          PlayerWithPositions.push(players[i]);
        }
      }
      setPlayers(PlayerWithPositions);
    }
  };

  // prevent matchfield drag
  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  /**
   *
   *
   *
   *
   *
   * Above here is only Matchfield function/logic
   */

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={1}
            container
            direction="column"
            justify="center"
            alignItems="center"
          />
          <Grid
            item
            xs={9}
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ borderRight: "0.2em solid black", padding: "0.5em" }}
          >
            {loading ? <LoadingComp show={loading} /> : null}
            <div className={classes.wrapper}>
              <div className={classes.above}>
                <div className={classes.box}>
                  <img
                    src={field}
                    alt="Field"
                    className={classes.field}
                    ref={divRef}
                    onDragStart={preventDragHandler}
                  />
                </div>
              </div>
              <div className={classes.under}>
                <div>
                  <div ref={drop} className={classes.box}>
                    <img
                      src={field}
                      alt="Field"
                      className={classes.field}
                      onDragStart={preventDragHandler}
                    />

                    {Object.keys(players).map((key) => {
                      const { left, top, name, surname, visibleOnSelection } =
                        players[key];
                      return (
                        <div>
                          {visibleOnSelection ? null : (
                            <Player
                              id={key}
                              left={left}
                              top={top}
                              surname={surname}
                              name={name}
                              passPlayerDeleteId={setPlayerDeleteId}
                            ></Player>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <Button onClick={saveExercise}>Uebung Speichern</Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="h6">Uebung bewerten:</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
            <Typography variant="h6">Feldelemente:</Typography>
            <Typography variant="subtitle2">Spieler:</Typography>
            <Grid
              container
              spacing={1}
              direction="row"
              justify=""
              alignItems="center"
            >
              {players.map((player) => (
                <div className="test_player">
                  {player.visibleOnSelection ? (
                    <Button
                      onClick={() => {
                        addPlayer(player.id);
                      }}
                      className={classes.playerButton}
                    >
                      <PlayerButton key={player.id} player={player} />
                    </Button>
                  ) : null}
                </div>
              ))}
            </Grid>
            <Typography variant="subtitle2">Linien:</Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <img src={arrow_n} className={classes.arrow} />
              <Typography variant="subtitle2">Ballweg</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <img src={arrow_r} className={classes.arrow} />
              <Typography variant="subtitle2">Rotation</Typography>
            </Grid>
            <Typography variant="subtitle2">Objekte:</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

/** Function specific styles */
const styles = makeStyles({
  root: {
    flexGrow: 1,
    marginLeft: "240px",
  },
  test_player: {
    height: "45px",
    width: "50px",
  },
  paper: {
    padding: 2,
    textAlign: "center",
    color: "black",
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
  wrapper: {
    position: "relative",
  },
  above: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  box: {
    height: "90%",
    width: "90%",
    position: "relative",
    //border: '1px solid black',
  },
  field: {
    height: "100%",
    width: "100%",
    position: "relative",
    border: "1px solid black",
  },
  field_player: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  orange: {
    color: deepOrange[500],
    backgroundColor: deepOrange[100],
  },
  purple: {
    color: deepPurple[500],
    backgroundColor: deepPurple[100],
  },
});

export default Exercises;
