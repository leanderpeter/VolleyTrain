import React, { useState, useLayoutEffect } from "react";
import {
  Select,
  Typography,
  makeStyles,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TeamBO from "../../api/TeamBO";
import goBackIcon from "../../assets/goBackIcon.svg";
import CreateExercise from "../dialogs/CreateExercise";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../layout/TabStyling.css";
import { flexbox } from "@material-ui/system";
import TrainingBO from "../../api/TrainingBO";
import ExerciseComponent from "../ExerciseComponent";
import ExerciseBO from "../../api/ExerciseBO";
/**
 *
 * @returns
 * it is to mentioned that the package react-tabs uses its own css for styling
 * The styling file can be found at ../layout/TabStyling.css
 *
 */

const TrainingTeammanagement = (currentUser) => {
  // init styling
  const classes = styles();

  const [team, setTeam] = useState(null);

  // init teams state
  const [teams, setTeams] = useState([]);

  // init loading process state
  const [loadingInProgres, setLoadingInProgress] = useState(false);

  //init error state
  const [error, setError] = useState(false);

  // init players for team
  const [player, setPlayer] = useState([]);

  // init Trainingsablauf state
  const [teamChosen, setChosenTeam] = useState(false);

  // init teams state
  const [name, setName] = useState(null);

  // init teams state
  const [goal, setGoal] = useState(null);

  // init nameChosen state
  const [nameChosen, setChosenName] = useState(false);

  // init Training state
  const [training, setTraining] = useState(null);

  // init exercises state
  const [exercises, setExercise] = useState(null);

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
  };

  const createTraining = () => {
    var training = new TrainingBO();
    training.setName(name);
    training.setTeamId(team.id);
    training.setUserId(currentUser["currentUser"].getID());
    training.setVisibility(1);
  };

  //call function when team is changed
  useLayoutEffect(() => {
    if (!(team == null)) {
      getPlayersForTeam(team.id);
      setChosenTeam(true);
    }
    if (!(name == null)) {
      setChosenName(true);
    }
    if (!(name == null && team == null)) {
      createTraining();
    }
  }, [, team, name]);

  //call function when render
  useLayoutEffect(() => {
    getTeams();
    getExercises();
  }, []);

  const getExercises = () => {
    VolleytrainAPI.getAPI()
      .getExercises()
      .then((exercise) => {
        //setExercises(exercise);
      })
      .catch((e) => {
        setExercise(null);
      });
  };

  return (
    <div className={classes.root}>
      <div>
        <Tabs>
          <TabList>
            <Tab>Teammanagement</Tab>
            <Tab disabled={false}>Trainingsablauf</Tab>
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
                  onChange={(event) => setTeam(event.target.value)}
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
          </TabPanel>
          <TabPanel>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <ExerciseComponent />
              </Grid>
              <CreateExercise
                className={classes.exerciseButton}
                Players={player}
                Training={training}
              />
            </Grid>
          </TabPanel>
        </Tabs>
      </div>
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
  heading: {
    fontSize: "21px",
    color: "black",
  },
  container: {
    display: "flex",
    marginTop: "40px",
    justifyContent: "flex-start",
    marginBottom: "40px",
  },
  teamauswahl: {
    minWidth: 200,
  },
  name: {
    marginLeft: "150px",
    minWidth: 300,
  },
  goal: {
    width: "90%",
  },
  trainingGoal: {
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    borderBottom: "3px solid rgb(212, 212, 212)",
  },
  exerciseButton: {},
});

export default TrainingTeammanagement;
