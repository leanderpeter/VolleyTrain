import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import VolleytrainAPI from "../api/VolleytrainAPI";
import { Link } from "react-router-dom";

class TrainingScheduleEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      training: props.training,
      trainingDate: null,
      trainingTime: null,
      trainingDatetime: null,
      team: null,
    };
  }

  getTrainingDateTime = () => {
    var trainingDateTime = new Date(this.props.training.getDatetime());

    var date =
      trainingDateTime.getDate() +
      "." +
      (trainingDateTime.getMonth() + 1) +
      "." +
      trainingDateTime.getFullYear();

    var time =
      trainingDateTime.getHours() +
      ":" +
      trainingDateTime.getMinutes() +
      ":" +
      trainingDateTime.getSeconds();

    var datetime = date + " " + time;

    this.setState({
      trainingDate: date,
      trainingTime: time,
      trainingDatetime: datetime,
    });
  };

  getTeam = () => {
    VolleytrainAPI.getAPI()
      .getTeamByID(this.state.training.getTeamId())
      .then((team) => {
        this.setState({
          team: team,
        });
      });
  };

  componentDidMount = () => {
    this.getTrainingDateTime();
    this.getTeam();
  };

  render() {
    const { classes } = this.props;
    const { training, trainingDate, trainingTime, team } = this.state;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={10}>
            <Link
              to={{
                pathname: "/viewTraining",
                training: training,
              }}
              className={classes.link}
            >
              <Card className={classes.border} align="center">
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={3} sm={2}>
                      <Typography align="center">
                        {trainingDate}
                        <br />
                        {trainingTime}
                      </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3} sm={2}>
                      <Typography align="center">
                        {team ? team.getName() : null}
                      </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3} sm={2}>
                      <Typography align="center">
                        {training.getName()}
                      </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3} sm={5}>
                      <Typography align="center">
                        {training.getGoal()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={1} align="center">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1} align="center">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    width: "100%",
  },
  border: {
    border: "2px solid #0B3298",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
  link: {
    textDecorationLine: "none",
  },
  divider: {
    backgroundColor: "black",
  },
});

export default withStyles(styles)(TrainingScheduleEntry);
