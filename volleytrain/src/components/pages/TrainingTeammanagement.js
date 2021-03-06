import React, { useState, useLayoutEffect, useReducer } from "react";
import {
  Select,
  makeStyles,
  InputLabel,
  FormControl,
  CardContent,
  MenuItem,
  TextField,
  Card,
  Typography,
  Divider,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CreateExercise from "../dialogs/CreateExercise";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../layout/TabStyling.css";
import TrainingBO from "../../api/TrainingBO";
import ExerciseComponent from "../ExerciseComponent";
import ExerciseBO from "../../api/ExerciseBO";
import ContextErrorMessage from "../dialogs/ContextErrorMessage";
import LoadingProgress from "../dialogs/LoadingProgress";
/**
 *
 * @returns
 * it is to mentioned that the package react-tabs uses its own css for styling
 * The styling file can be found at ../layout/TabStyling.css
 *
 */

const TrainingTeammanagement = ({ currentUser }) => {
  // force update handler
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  // init styling
  const classes = styles();

  const [team, setTeam] = useState(null);

  // init teams state
  const [teams, setTeams] = useState([]);

  // init loading process state
  const [loadingInProgress, setLoadingInProgress] = useState(false);

  //init error state
  const [error, setError] = useState(null);

  // init players for team
  const [player, setPlayer] = useState([]);

  // init teams state
  const [name, setName] = useState("");

  // init teams state
  const [goal, setGoal] = useState("");

  // init Training state
  const [training, setTraining] = useState(null);

  // init exercises state
  const [exercises, setExercises] = useState(null);

  //exercise added
  const [exercisesAdded, triggerExerciseAdded] = useState(null);

  //call function when render
  useLayoutEffect(() => {
    if (!(training == null)) {
      getExercisesByTrainingId(training.id);
    }

    forceUpdate();
  }, [exercisesAdded]);

  //call function when render
  useLayoutEffect(() => {
    forceUpdate();
  }, [, exercises]);

  const getTeams = () => {
    VolleytrainAPI.getAPI()
      .getAllTeams()
      .then((teamBOs) => {
        setTeams(teamBOs);
        setLoadingInProgress(false);
      })
      .catch((e) => {
        setTeams(null);
        setError(e);
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

  const createTraining = () => {
    if (!(team == null) && !(name == "") && !(goal == "")) {
      let training = new TrainingBO();
      training.setName(name);
      training.setTeamId(team.id);
      training.setUserId(currentUser.getID());
      training.setVisibility(1);
      training.setDatetime("2021-07-28 13:45:54");
      training.setCreationDate("123");
      training.setID(1);
      training.setGoal(goal);
      addTrainingBO(training);
    }
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
    getPlayersForTeam(event.target.value.id);
  };

  //call function when render
  useLayoutEffect(() => {
    getTeams();
  }, []);

  console.log(exercises);

  const getExercisesByTrainingId = (id) => {
    VolleytrainAPI.getAPI()
      .getExercisesByTraining(id)
      .then((exercise) => {
        setExercises(exercise);
      })
      .catch((e) => {
        setExercises(null);
      });
  };

  const addTrainingBO = (trainingBO) => {
    VolleytrainAPI.getAPI()
      .addTraining(trainingBO)
      .then((trainingBO) => {
        setTraining(trainingBO);
        console.log(trainingBO);
        getExercisesByTrainingId(trainingBO.id);
      })
      .catch((e) => {
        setTraining(null);
      });
  };

  return (
    <div className={classes.root}>
      <div>
        <Tabs>
          <TabList>
            <Tab>Teammanagement</Tab>
            <Tab
              disabled={team == null || name == "" || goal == ""}
              onClick={createTraining}
            >
              Trainingsablauf
            </Tab>
          </TabList>
          <TabPanel>
            <div className={classes.container}>
              <FormControl
                required
                variant="outlined"
                className={classes.teamauswahl}
              >
                <InputLabel id="teamauswahl">Teamauswahl</InputLabel>
                <Select
                  label="Teamauswahl"
                  value={team}
                  onChange={handleTeamChange}
                >
                  {teams.map((team) => {
                    return <MenuItem value={team}>{team.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <TextField
                className={classes.name}
                value={name}
                onChange={(event) => setName(event.target.value)}
                label="Name des Trainings"
                variant="outlined"
                required
              ></TextField>
            </div>
            <TextField
              error={false}
              className={classes.goal}
              required
              label="Trainingsziel"
              variant="outlined"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
            <Typography className={classes.heading}>
              Spieler??bersicht
            </Typography>
            <Grid item xs={10}>
              {player.map((playerBOs) => (
                <Card className={classes.border}>
                  <CardContent>
                    <Grid container>
                      <Grid key={playerBOs.getID()} item xs={2}>
                        <Typography>
                          <b>{playerBOs.getSurname()}</b>
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid key={playerBOs.getID()} item xs={2}>
                        <Typography>
                          <b>{playerBOs.getName()}</b>
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid key={playerBOs.getID()} item xs={2}>
                        <Typography>
                          <b>{playerBOs.getT_number()}</b>
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid key={playerBOs.getID()} item xs={2}>
                        <Typography>
                          <b>{playerBOs.getRole()}</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                {exercises
                  ? exercises.map((exerciseBO) => (
                      <ExerciseComponent exerciseBO={exerciseBO} />
                    ))
                  : null}
              </Grid>
              <CreateExercise
                className={classes.exerciseButton}
                Players={player}
                Training={training}
                Trigger={triggerExerciseAdded}
              />
            </Grid>
          </TabPanel>
        </Tabs>
      </div>
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
  container: {
    display: "flex",
    marginTop: "40px",
    justifyContent: "flex-start",
    marginBottom: "50px",
  },
  teamauswahl: {
    minWidth: 200,
  },
  name: {
    marginLeft: "150px",
    minWidth: 300,
  },
  goal: {
    width: "80%",
    marginBottom: 50,
  },
  divider: {
    borderBottom: "3px solid rgb(212, 212, 212)",
  },
  exerciseButton: {},
  border: {
    border: "2px solid #0B3298",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
});

export default TrainingTeammanagement;
