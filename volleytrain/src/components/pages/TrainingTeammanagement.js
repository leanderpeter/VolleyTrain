import React, { useState, useLayoutEffect } from "react";
import {
  Select,
  Typography,
  makeStyles,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TeamBO from "../../api/TeamBO";
import goBackIcon from "../../assets/goBackIcon.svg";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../layout/TabStyling.css";
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
    }
    console.log(player);
  }, [, team]);

  //call function when render
  useLayoutEffect(() => {
    getTeams();
  }, []);

  console.log(team);

  return (
    <div className={classes.root}>
      <div>
        <Tabs>
          <TabList>
            <Tab>Teammanagement</Tab>
            <Tab disabled={false}>Trainingsablauf</Tab>
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
          </TabPanel>
          <TabPanel>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Typography variant="h6">Uebung bewerten:</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  size="large"
                />
                <Paper className={classes.paper}>xs=12</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>xs=6</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>xs=6</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
              </Grid>
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
  headerContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  heading: {
    fontSize: "21px",
    color: "black",
  },
  headingLink: {
    marginLeft: "30px",
    textDecorationLine: "none",
  },
  headingSelected: {
    fontSize: "21px",
    textDecorationLine: "underline",
    textDecorationColor: "#3ECCA5",
    marginLeft: "30px",
    color: "black",
  },
  selectContainer: {
    display: "flex",
    marginTop: "40px",
  },
  teamauswahl: {
    minWidth: 250,
  },
});

export default TrainingTeammanagement;
