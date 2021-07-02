import React, { useState, useLayoutEffect } from "react";
import {
    makeStyles,
  } from "@material-ui/core";
import { useLocation} from "react-router-dom";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import ExerciseComponent from "../ExerciseComponent";
import LoadingProgress from "../dialogs/LoadingProgress";
import ContextErrorMessage from "../dialogs/ContextErrorMessage";
import Exercises from "../Exercises";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";


const TrainingTeammanagement = () => {
    // init styling
    const classes = styles();

    // get props from link from TrainingScheduleEntry.js
    const location = useLocation()
    const training  = location.training
  
    // init exercises state
    const [exercises, setExercises] = useState(null);
    
    // init players for team
    const [player, setPlayer] = useState([]);

    const [loadingInProgress, setLoadingInProgress] = useState(false);

    //init error state
    const [error, setError] = useState(null);

    const getExercisesByTrainingId = (id) => {
      VolleytrainAPI.getAPI()
        .getExercisesByTraining(id)
        .then((exercises) => {
          setExercises(exercises);
          setLoadingInProgress(false);
        })
        .catch((e) => {
          setExercises(null);
          setLoadingInProgress(false);
        });
        setLoadingInProgress(true);
    };

    const getPlayersForTeam = (id) => {
      VolleytrainAPI.getAPI()
        .getPlayersByTeam(id)
        .then((playerBOs) => {
          setPlayer(playerBOs);
          setLoadingInProgress(false);
        })
        .catch((e) => {
          setPlayer([]);
          setError(e);
          setLoadingInProgress(false);
        });
      setLoadingInProgress(true);
    };

    const MatchfieldIDMock = 1;

    //call function when render
    useLayoutEffect(() => {
      getExercisesByTrainingId(training.getID())
      getPlayersForTeam(training.getTeamId())
    }, []);
  
    return (
      <div className={classes.root}>
          {exercises
                  ? exercises.map((exercise) => (
                    <div className={classes.exercise}>
                      <ExerciseComp
                      key={exercise.getID()}
                      Players={player}
                      MatchfieldID={MatchfieldIDMock}
                      exerciseToChange={exercise}
                      />
                    </div>
                    ))
                  : null}
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage
        error={error}
        contextErrorMsg={"Ein Fehler ist aufgetreten"}
      />
      </div>
    );
  };
  
  /** Component specific styles */
  const styles = makeStyles({
    root: {
      margin: "auto",
      marginLeft: "280px",
      marginRight: "50px",
    },
    exercise:{
      marginBottom: "100px"
    }
  });
  
  const ExerciseComp = ({
    Players,
    MatchfieldID,
    setShowCompState,
    exerciseToChange,
  }) => (
    <div id="ExerciseComp">
      <DndProvider backend={HTML5Backend}>
        <Exercises
          Players={Players}
          MatchfieldID={MatchfieldID}
          setShowCompState={setShowCompState}
          exercise={exerciseToChange}
          viewOnly={true}
        />
      </DndProvider>
    </div>
  );  

  export default TrainingTeammanagement;