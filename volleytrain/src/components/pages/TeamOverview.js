import {
  withStyles,
  Card,
  Paper,
  CardContent,
  Button,
  Typography,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import CreateTeam from "../dialogs/CreateTeam";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Team from "./Team";
import AddIcon from "@material-ui/icons/Add";
import TrainingdayBO from "../../api/TrainingdayBO";

import TeamBO from "../../api/TeamBO";

class TeamOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      teams: [],
      teamid: null,
      error: null,
      loadingInProgress: false,
    };
  }

  handleClickOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  getTeams = () => {
    VolleytrainAPI.getAPI()
      .getAllTeams()
      .then((teamBOs) =>
        this.setState({
          teams: teamBOs,
          error: null,
          loadingInProgress: false,
        })
      )
      .catch((e) =>
        this.setState({
          teams: [],
          error: e,
          loadingInProgress: false,
        })
      );
  };

  createTeam = (teamname) => {
    let team = new TeamBO();
    team.setID(1);
    team.setName(teamname);
    team.setTrainer(this.props.currentUser.getID());
    VolleytrainAPI.getAPI()
      .addTeam(team)
      .then(() => {
        this.getCurrentTeam(team.getName());
      });
  };

  getCurrentTeam = (teamname) => {
    VolleytrainAPI.getAPI()
      .getTeamByName(teamname)
      .then((teamBO) => {
        this.setState({ teamid: teamBO.getID() });
      })
      .catch((e) => {
        this.setState({
          team: [],
          teamid: null,
          error: e,
        });
      });
    this.setState({
      error: null,
    });
  };

  saveTrainingday = (weekday, starttime, endtime) => {
    let trainingday = new TrainingdayBO();
    trainingday.setID(1);
    trainingday.setWeekday(weekday);
    trainingday.setStarttime(starttime);
    trainingday.setEndtime(endtime);
    trainingday.setTeam(this.state.teamid);
    VolleytrainAPI.getAPI().addTrainingday(trainingday);
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
    this.getTeams();
  };

  componentDidMount() {
    this.getTeams();
  }

  render() {
    const { classes, currentUser } = this.props;
    const { dialogOpen, teams } = this.state;

    return (
      <div>
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          className={classes.root}
        >
          {teams.map((teamBO) => (
            <Grid key={teamBO.getID()} item>
              <Link
                to={{ pathname: "/team", state: { team: teamBO } }}
                className={classes.link}
                team={teamBO}
              >
                <Paper className={classes.papes}>
                  <Typography>
                    <b>{teamBO.getName()}</b>
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}

          <Grid item>
            <Paper
              className={classes.border}
              variant="outlined"
              onClick={this.handleClickOpen}
              color="secondary"
            >
              <Typography color="primary">
                <b>
                  Team hinzufügen <AddIcon />
                </b>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <CreateTeam
          dialogOpen={dialogOpen}
          onClose={this.handleClose}
          currentUser={currentUser}
          createTeam={this.createTeam}
          saveTrainingday={this.saveTrainingday}
        />
      </div>
    );
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    width: "80%",
    marginLeft: "20%",
  },
  link: {
    textDecoration: "None",
  },
  border: {
    border: "2px solid #0B3298",
    boxSizing: "border-box",
    alignItems: "center",
    display: "flex",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    background: "#fcfcfc",
    color: "#fcfcfc",
    paddingLeft: theme.spacing(2),
    width: theme.spacing(26),
    height: theme.spacing(18),
  },
  papes: {
    background: "linear-gradient(269.97deg, #0B3298 14.96%, #071168 178.28%)",
    borderRadius: "9px",
    display: "flex",
    color: "#ffffff",
    paddingLeft: theme.spacing(2),
    alignItems: "center",
    width: theme.spacing(26),
    height: theme.spacing(18),
  },
  button: {
    color: "#ffffff",
    background: "linear-gradient(90.46deg, #FFD542 12.09%, #FFB676 104.14%)",
    borderRadius: "9px",
    fontWeight: "bold",
    fontVariant: "normal",
  },
});

export default withStyles(styles)(TeamOverview);
