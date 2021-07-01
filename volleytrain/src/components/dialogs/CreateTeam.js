import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Divider,
} from "@material-ui/core";
import React from "react";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamname: "",
      timeDisabled: true,
      teamDisabled: false,
      teamnameError: false,
      trainingday: 1,
      weekdays: [
        "montags",
        "dienstags",
        "mittwochs",
        "donnerstags",
        "freitags",
        "samstags",
        "sonntags",
      ],
      weekday: "",
      starttime: "",
      endtime: "",
    };
  }

  resetState = () => {
    this.setState({
      teamname: "",
      timeDisabled: true,
      teamDisabled: false,
      teamnameError: false,
      trainingday: 1,
      weekday: "",
      starttime: "",
      endtime: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      teamname: e.target.value,
    });
  };

  handleDayChange = (e) => {
    this.setState({
      weekday: e.target.value,
    });
  };

  handleStarttimeChange = (e) => {
    this.setState({
      starttime: e.target.value,
    });
  };

  handleEndtimeChange = (e) => {
    this.setState({
      endtime: e.target.value,
    });
  };

  handleDeleteTime = () => {
    this.setState({
      weekday: "",
      starttime: "",
      endtime: "",
    });
  };

  clearTeamname = () => {
    this.setState({
      teamname: "",
    });
  };

  createTrainingday = () => {
    if (
      this.state.weekday != "" &&
      this.state.starttime != "" &&
      this.state.endtime != ""
    ) {
      this.props.saveTrainingday(
        this.state.weekday,
        this.state.starttime,
        this.state.endtime
      );
      this.handleDeleteTime();

      let daycount = this.state.trainingday + 1;
      this.setState({ timeError: false, trainingday: daycount });
    } else {
      this.setState({ timeError: true });
    }
  };

  createTeam = () => {
    if (this.state.teamDisabled) {
      this.createTrainingday();
    } else if (this.state.teamname != "" && this.state.teamDisabled === false) {
      this.props.createTeam(this.state.teamname);
      if (this.state.weekday != "") {
        setTimeout(() => {
          this.createTrainingday();
        }, 1000);
      }

      this.setState({
        teamDisabled: true,
        teamnameError: false,
        timeError: false,
      });
    } else {
      this.setState({
        teamnameError: true,
      });
    }
  };

  render() {
    const { classes, dialogOpen, onClose } = this.props;
    const {
      teamname,
      teamDisabled,
      timeError,
      teamnameError,
      weekday,
      starttime,
      endtime,
      weekdays,
      trainingday,
    } = this.state;

    return (
      <div>
        <Dialog className={classes.root} open={dialogOpen} onClose={onClose}>
          <DialogTitle>
            <Grid container>
              <Grid item xs={4}>
                <Button className={classes.backButton} onClick={onClose}>
                  <ArrowBackOutlinedIcon
                    className={classes.backButton}
                    color="primary"
                  />
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5" color="primary">
                  <b>Neues Team erstellen</b>
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} />
              <Grid item xs={3}>
                <Typography color="primary">Teamname:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={4}>
                <TextField
                  error={teamnameError}
                  required
                  disabled={teamDisabled}
                  color="primary"
                  value={teamname}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.error}>
                  {teamnameError
                    ? "Du musst deinem Team einen Namen geben."
                    : ""}
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="secondary">
                  <b>{teamDisabled ? trainingday + ". Trainingstag" : null}</b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography color="primary">Wochentag:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={4}>
                <Select
                  error={timeError}
                  required
                  onChange={this.handleDayChange}
                  value={weekday}
                  fullWidth
                >
                  {weekdays.map((day) => (
                    <MenuItem key={day.indexOf} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.error}>
                  {timeError ? "Du musst einen Tag auswählen." : ""}
                </Typography>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={2}>
                <Typography color="primary">Beginn:</Typography>
              </Grid>
              <Grid item xs={2} className={classes.border}>
                <TextField
                  error={timeError}
                  required
                  type="time"
                  onChange={this.handleStarttimeChange}
                  value={starttime}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.error}>
                  {timeError ? "Du musst eine Uhrzeit auswählen." : ""}
                </Typography>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={2}>
                <Typography color="primary">Ende:</Typography>
              </Grid>
              <Grid item xs={2} className={classes.border}>
                <TextField
                  error={timeError}
                  required
                  type="time"
                  onChange={this.handleEndtimeChange}
                  value={endtime}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.error}>
                  {timeError ? "Du musst eine Uhrzeit auswählen." : ""}
                </Typography>
              </Grid>
              <Grid item xs={12} />
              <Grid item xs={6}>
                <Button
                  color="secondary"
                  disabled={!teamDisabled}
                  variant={teamDisabled ? "contained" : "text"}
                  onClick={this.createTrainingday}
                  fullWidth
                >
                  <AddIcon className={classes.backButton} color="primary" />
                  Trainingszeit hinzufügen
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  disabled={teamDisabled}
                  variant={teamDisabled ? "text" : "contained"}
                  onClick={this.createTeam}
                  fullWidth
                >
                  <CheckIcon className={classes.backButton} color="secondary" />
                  {teamDisabled ? "Team erstellt" : "Team erstellen"}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    width: "100%",
  },
  backButton: {
    borderRadius: "500px",
  },
  border: {
    border: "1px solid #0B3298",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
    background: "#fcfcfc",
  },
  button: {
    color: "#ffffff",
    background: "linear-gradient(90.46deg, #FFD542 12.09%, #FFB676 104.14%)",
    borderRadius: "9px",
    fontWeight: "bold",
    fontVariant: "normal",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
});

export default withStyles(styles)(CreateTeam);
