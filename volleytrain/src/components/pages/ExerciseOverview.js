import {
  withStyles,
  Card,
  Paper,
  CardContent,
  Button,
  Typography,
  Grid,
  FormHelperText,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import React from "react";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";

class ExerciseOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      error: null,
      loadingInProgress: false,
      filteredExercises: [],
      exerciseFilter: "",
    };
  }

  // get all exercises from backend
  getExercises = () => {
    VolleytrainAPI.getAPI()
      .getExercises()
      .then((exerciseBOs) =>
        this.setState({
          exercises: exerciseBOs,
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

  filterFieldValueChange = (event) => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredExercises: this.state.exercises.filter((exercise) => {
        let nameContainsValue = exercise
          .getName()
          .toLowerCase()
          .includes(value);
        return nameContainsValue;
      }),
      exerciseFilter: value,
    });
  };

  clearFilterFieldButtonClicked = () => {
    this.setState({
      filteredExercises: [...this.state.exercises],
      exerciseFilter: "",
    });
  };

  render() {
    const { classes } = this.props;
    const { exercises, exerciseFilter } = this.state;

    return (
      <div className={classes.root}>
        <Typography className={classes.heading}>Übungsverwaltung</Typography>
        <Grid className={classes.heading} item xs={3}>
          <TextField
            autoFocus
            fullWidth
            id="exerciseFilter"
            type="text"
            value={exerciseFilter}
            onChange={this.filterFieldValueChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs />
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
    border: "2px solid #3ECCA5",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
  heading: {
    fontSize: "21px",
    marginBottom: "20px",
    textDecorationLine: "underline",
    textDecorationColor: "#3ECCA5",
  },
  solid: {
    border: "1px solid #bbb",
    marginLeft: "0px",
    marginRight: "0px",
  },
});

export default withStyles(styles)(ExerciseOverview);
