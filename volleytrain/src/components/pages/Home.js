import React, { Component } from "react";
import PropTypes from "prop-types";
import Exercises from "../Exercises";
import TeamOverview from "./TeamOverview";
import Box from "@material-ui/core/Box";
import {
  Button,
  Grid,
  withStyles,
  Paper,
  GridList,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GroupIcon from "@material-ui/icons/Group";
import Divider from "@material-ui/core/Divider";
import TrainingSchedule from "../TrainingSchedule";
import ExerciseOverview from "./ExerciseOverview";

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          className={classes.root}
        >
          <Grid item component={Link} to={"/exerciseForm"}>
            <Paper
              className={classes.border}
              variant="outlined"
              color="secondary"
            >
              <Button>
                Trainingsplan erstellen
                <FitnessCenterIcon />
              </Button>
            </Paper>
          </Grid>
          <Grid item component={Link} to={"/training"}>
            <Paper
              className={classes.border}
              variant="outlined"
              color="secondary"
            >
              <Button>
                Trainingspläne
                <AvTimerIcon />
              </Button>
            </Paper>
          </Grid>
          <Grid item component={Link} to={"/exerciseoverview"}>
            <Paper
              className={classes.border}
              variant="outlined"
              color="secondary"
            >
              <Button>
                Übungsverwaltung
                <MenuBookIcon />
              </Button>
            </Paper>
          </Grid>
          <Grid item component={Link} to={"/teamoverview"}>
            <Paper
              className={classes.border}
              variant="outlined"
              color="secondary"
            >
              <Button>
                Team
                <GroupIcon />
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Divider className={classes.solid} />
        <TrainingSchedule />
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
    boxSizing: "border-box",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    background:
      "linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)",
    width: theme.spacing(26),
    height: theme.spacing(18),
  },
  papes: {
    background:
      "linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)",
    borderRadius: "9px",
    fontWeight: "bold",
    fontVariant: "normal",
    color: "#ffffff",
    alignItems: "center",
    textAlign: "center",
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
  solid: {
    border: "1px solid #bbb",
    marginLeft: "280px",
    marginRight: "50px",
  },
});

/** PropTypes */
Home.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /**
   * Handler function, which is called if the user wants to sign in.
   */
  onSignIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(Home);
