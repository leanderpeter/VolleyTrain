import React, { useState, useLayoutEffect } from "react";
import {
  Select,
  Typography,
  makeStyles,
  InputLabel,
  FormControl,
  CardContent,
  MenuItem,
  TextField,
  Card,
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
/**
 *
 * @returns
 * it is to mentioned that the package react-tabs uses its own css for styling
 * The styling file can be found at ../layout/TabStyling.css
 *
 */

const TrainingTeammanagement = () => {
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
  const [teamChosen, setChosenTeam] = useState(true);

  // init Training state
  const [training, setTraining] = useState(null);

  var MOCKUPTRAINING = new TrainingBO();
  MOCKUPTRAINING.setID(1);
  MOCKUPTRAINING.setDatetime("");
  MOCKUPTRAINING.setName("Grossen Training");
  MOCKUPTRAINING.setGoal("Viel erreichen");
  if (!(team == null)) {
    MOCKUPTRAINING.setTeamId(team.id);
  }
  MOCKUPTRAINING.setUserId(1);
  MOCKUPTRAINING.setVisibility(1);

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
      .getPlayerByTeam(id)
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

  //call function when team is changed
  useLayoutEffect(() => {
    if (!(team == null)) {
      getPlayersForTeam(team.id);
      setChosenTeam(false);
    }
  }, [, team]);

  //call function when render
  useLayoutEffect(() => {
    getTeams();
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <Tabs>
          <TabList>
            <Tab>Teammanagement</Tab>
            <Tab disabled={teamChosen}>Trainingsablauf</Tab>
          </TabList>

          <TabPanel>
            <div className={classes.selectContainer}>
              <FormControl variant="outlined" className={classes.teamauswahl}>
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
            </div>
            <Typography className={classes.heading}>Spielerübersicht</Typography>
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
                  <Divider orientation="vertical" flexItem/>
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getName()}</b>
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem/>
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getT_number()}</b>
                    </Typography>  
                  </Grid>
                  <Divider orientation="vertical" flexItem/>
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getRole()}</b>
                    </Typography>  
                  </Grid>
                </Grid>
              </CardContent>
              </Card>))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.trainingGoal}
                >
                  Trainingsziel:
                </Typography>
                <TextField
                  error={false}
                  required
                  id="outlined-required"
                  placeholder="Neues Ziel..."
                  variant="outlined"
                  fullWidth
                  onChange={(name) => {}}
                />
              </Grid>

              <Grid item xs={12}>
                <div className={classes.divider} />
              </Grid>
              <Grid item xs={12}></Grid>
              <CreateExercise
                className={classes.exerciseButton}
                Players={player}
                Training={MOCKUPTRAINING}
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
  selectContainer: {
    display: "flex",
    marginTop: "40px",
  },
  teamauswahl: {
    minWidth: 250,
  },
  trainingGoal: {
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    borderBottom: "3px solid rgb(212, 212, 212)",
  },
  exerciseButton: {},
  border: {
    border: "2px solid #3ECCA5",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
});

export default TrainingTeammanagement;
