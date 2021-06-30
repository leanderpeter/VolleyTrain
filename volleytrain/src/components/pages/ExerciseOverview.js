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


class ExerciseOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      error: null,
      loadingInProgress: false,
    };
  }

  getExercises = () => {
    VolleytrainAPI.getExercises()
      .then((exerciseBO) =>
        this.setState({
          exercises: exerciseBO,
          error: null,
          loadingInProgress: false,
        })
      )
      .catch((e) =>
        this.setState({
          exercises: [],
          error: e,
          loadingInProgress: false,
        })
      );
  };

  componentDidMount() {
    this.getExercises();
  }

  render() {
    const { classes, currentUser } = this.props;
    const { exercises } = this.state;

    return (
      <div>
        <Typography>Übungsverwaltung</Typography>
        <Grid>
          {exercises.map((exerciseBO) => (
            <Grid key={exerciseBO.getID()} item>
              <Paper className={classes.papes}>
                <Typography>
                  <b>{exerciseBO.getName()}</b>
                </Typography>
              </Paper>
            </Grid>
          ))}
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
    border: "2px solid #BFCE0D",
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
    background:
      "linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)",
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

export default withStyles(styles)(ExerciseOverview);
