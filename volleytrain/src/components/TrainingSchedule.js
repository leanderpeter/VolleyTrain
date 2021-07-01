import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import TrainingScheduleEntry from "./TrainingScheduleEntry";
import VolleytrainAPI from "../api/VolleytrainAPI";

class TrainingSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainings: [],
      error: null,
      currentDate: null,
      currentTime: null,
      currentDatetime: null,
    };
  }

  getVisibleTrainings = () => {
    VolleytrainAPI.getAPI()
      .getVisibleTrainings()
      .then((trainingBOs) => {
        this.setState({
          trainings: trainingBOs,
          error: null,
        });
      })
      .catch((e) => {
        this.setState({
          trainings: [],
          error: e,
        });
      });
    this.setState({
      error: null,
    });
  };

  getCurrentDateTime = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      "." +
      today.getMilliseconds();
    var datetime = date + " " + time;
    console.log(typeof datetime);
    this.setState({
      currentDate: date,
      currentTime: time,
      currentDatetime: datetime,
    });
  };

  removeTraining = (trainingId) => {
    let newTrainings = this.state.trainings.filter(
      (training) => training.getID() !== trainingId
    );
    console.log(newTrainings.length)
    this.setState({
      trainings: newTrainings,
    });
  };

  componentDidMount() {
    this.getVisibleTrainings();
    this.getCurrentDateTime();
  }

  render() {
    const { classes } = this.props;
    const { trainings, currentDate, currentTime, currentDatetime } = this.state;
    console.log(currentDatetime);
    return (
      <div className={classes.root}>
        <Grid>
          <Typography className={classes.heading}>Trainingspläne</Typography>
          <Typography>
            Datum: {currentDate} <br />
            Zeit: {currentTime}
          </Typography>

          <Grid>
            <Typography>
              <b>Geplante Trainings</b>
            </Typography>
            {trainings
              ? trainings.map((training) =>
                  Date.parse(training.getDatetime()) >=
                  Date.parse(currentDatetime) ? (
                    <TrainingScheduleEntry
                      key={training.getID()}
                      training={training}
                      onDelete={() => this.removeTraining(training.getID())}
                    />
                  ) : null
                )
              : null}
          </Grid>

          <Grid>
            <Typography>
              <b>Vergangene Trainings</b>
            </Typography>
            {trainings
              ? trainings.map((training) =>
                  Date.parse(training.getDatetime()) <
                  Date.parse(currentDatetime) ? (
                    <TrainingScheduleEntry
                      key={training.getID()}
                      training={training}
                    />
                  ) : null
                )
              : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    marginLeft: "280px",
    marginRight: "50px",
  },
  heading: {
    fontSize: "21px",
    marginBottom: "20px",
    textDecorationLine: "underline",
    textDecorationColor: "#3ECCA5",
  },
});

export default withStyles(styles)(TrainingSchedule);
