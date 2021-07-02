import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ExerciseOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      error: null,
      loadingInProgress: false,
    };
  }

  // get all exercises from backend
  getExercises = () => {
    VolleytrainAPI.getAPI()
      .getExercises()
      .then((exerciseBOs) =>
        this.setState({
          exercises: exerciseBOs,
          filteredExercises: [...exerciseBOs],
          error: null,
          loadingInProgress: false,
        })
      )
      .catch((e) =>
        this.setState({
          exercises: [],
          filteredExercises: [],
          error: e,
          loadingInProgress: false,
        })
      );
    this.setState({
      loadingInProgress: true,
      error: null,
    });
  };

  componentDidMount() {
    this.getExercises();
  }

  render() {
    const { classes } = this.props;
    const { exercises } = this.state;

    return (
      <div className={classes.root}>
        <Typography className={classes.heading}>Übungsverwaltung</Typography>
        <Grid>
          <Grid item xs={10}>
            {exercises.map((exerciseBOs) => (
              <Card className={classes.border}>
                <CardContent>
                  <Grid>
                    <Grid key={exerciseBOs.getID()} item>
                      <Typography>Übungsname:</Typography>
                      <Typography>
                        <b>{exerciseBOs.getName()}</b>
                      </Typography>
                    </Grid>
                    <Divider className={classes.solid} />
                    <Grid key={exerciseBOs.getID()} item>
                      <Typography>Übungsziel:</Typography>
                      <Typography>
                        <b>{exerciseBOs.getGoal()}</b>
                      </Typography>
                    </Grid>
                    <Divider className={classes.solid} />
                    <Grid key={exerciseBOs.getID()} item>
                      <Typography>Beschreibung:</Typography>
                      <Typography>
                        <b>{exerciseBOs.getDescription()}</b>
                      </Typography>
                    </Grid>
                    <Divider className={classes.solid} />
                    <Grid key={exerciseBOs.getID()} item>
                      <Typography>Bewertung:</Typography>
                      <Typography>
                        <b>{exerciseBOs.getRating()}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
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
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
  heading: {
    fontSize: "21px",
    marginBottom: "20px",
    textDecorationLine: "underline",
    textDecorationColor: "#0B3298",
  },
  solid: {
    border: "1px solid #bbb",
    marginLeft: "0px",
    marginRight: "0px",
  },
});

/** PropTypes */
ExerciseOverview.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ExerciseOverview));
