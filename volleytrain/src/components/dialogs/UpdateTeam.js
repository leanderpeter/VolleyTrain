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
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CheckIcon from "@material-ui/icons/Check";
import TeamBO from "../../api/TeamBO";
import TrainingdayBO from "../../api/TrainingdayBO";

class UpdateTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamname: this.props.team.getName(),
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
      trainingdayBO: null,
      addTrainingday: true,
      deleteTrainingday: false,
    };
  }

  resetState = () => {
    this.setState({
      teamname: "",
      teamnameError: false,
      trainingday: 1,
      trainingdayId: null,
      weekday: "",
      starttime: "",
      endtime: "",
    });
  };

  handleRadioChange = (e) => {
    e.target.value == "add"
      ? this.setState({ addTrainingday: true })
      : this.setState({ addTrainingday: false });
    e.target.value == "delete"
      ? this.setState({ deleteTrainingday: true })
      : this.setState({ deleteTrainingday: false });
  };

  handleChange = (e) => {
    this.setState({
      teamname: e.target.value,
    });
  };

  handleSelectChange = (e) => {
    this.setState({
      trainingdayBO: e.target.value,
      weekday: e.target.value.weekday,
      starttime: e.target.value.starttime,
      endtime: e.target.value.endtime,
    });
  };

  handleStarttimeChange = (e) => {
    this.setState({ starttime: e.target.value });
  };

  handleDayChange = (e) => {
    this.setState({ weekday: e.target.value });
  };

  handleEndtimeChange = (e) => {
    this.setState({ endtime: e.target.value });
  };

  handleDeleteTime = () => {
    this.setState({
      trainingdayBO: null,
      weekday: "",
      starttime: "",
      endtime: "",
    });
  };

  addTrainingday = () => {
    if (
      this.state.weekday !== "" &&
      this.state.starttime !== "" &&
      this.state.endtime !== "" &&
      this.state.trainingdayBO === null
    ) {
      let trainingday = new TrainingdayBO();
      trainingday.setID(1);
      trainingday.setWeekday(this.state.weekday);
      trainingday.setStarttime(this.state.starttime);
      trainingday.setEndtime(this.state.endtime);
      trainingday.setTeam(this.props.team.getID());
      this.props.updateTrainingday(trainingday);
      this.handleDeleteTime();

      this.setState({ timeError: false });
    } else {
      this.setState({ timeError: true });
    }
  };

  deleteTrainingday = () => {
    this.updateTeam();
    this.props.deleteTrainingday(this.state.trainingdayBO.getID());
  };

  trainingdayHandler = () => {
    this.updateTeam();
    setTimeout(() => {
      this.state.addTrainingday
        ? this.addTrainingday()
        : this.updateTrainingday();
    }, 1000);
  };

  updateTrainingday = () => {
    if (
      this.state.weekday !== "" &&
      this.state.starttime !== "" &&
      this.state.endtime !== "" &&
      this.state.trainingdayBO !== null
    ) {
      let trainingday = new TrainingdayBO();
      trainingday.setID(this.state.trainingdayBO.id);
      trainingday.setCreationDate(this.state.trainingdayBO.creation_date);
      trainingday.setWeekday(this.state.weekday);
      trainingday.setStarttime(this.state.starttime);
      trainingday.setEndtime(this.state.endtime);
      trainingday.setTeam(this.props.team.getID());
      this.props.updateTrainingday(trainingday);
      this.handleDeleteTime();

      this.setState({ timeError: false });
    } else {
      this.setState({ timeError: true });
    }
  };

  updateTeam = () => {
    if (this.state.teamname !== "") {
      let team = new TeamBO();
      team.setID(this.props.team.getID());
      team.setCreationDate(this.props.team.getCreationDate());
      team.setName(this.state.teamname);
      team.setTrainer(this.props.team.getTrainer());
      this.props.updateTeam(team);

      this.setState({
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
    const { classes, updateDialogOpen, onClose, trainingdays, team } =
      this.props;
    const {
      teamname,
      timeError,
      teamnameError,
      weekday,
      starttime,
      endtime,
      weekdays,
      addTrainingday,
      deleteTrainingday,
      trainingdayBO,
    } = this.state;

    return (
      <div>
        <Dialog
          className={classes.root}
          open={updateDialogOpen}
          onClose={onClose}
        >
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
                  <b>{teamname + " bearbeiten"}</b>
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
                  color="primary"
                  value={teamname}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.error}>
                  Vorher: {team.getName()}
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel color="primary">
                    Was möchtest du mit den Trainingstagen machen?
                  </FormLabel>
                  <RadioGroup
                    row
                    defaultValue="add"
                    onChange={this.handleRadioChange}
                    aria-label="position"
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="add"
                      label="hinzufügen"
                      labelPlacement="right"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="update"
                      label="aktualisieren"
                      labelPlaycement="right"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="delete"
                      label="löschen"
                      labelPlaycement="right"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <Typography color="primary">Trainingstag:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={4}>
                <Select
                  onChange={this.handleSelectChange}
                  fullWidth
                  disabled={addTrainingday}
                >
                  {trainingdays.map((day) => (
                    <MenuItem value={day}>
                      {day.weekday + ", Start: " + day.starttime + "Uhr"}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={5} />
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
                  {trainingdayBO ? "Vorher: " + trainingdayBO.getWeekday() : ""}
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
                  {trainingdayBO
                    ? "Vorher: " + trainingdayBO.getStarttime()
                    : ""}
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
                  {trainingdayBO ? "Vorher: " + trainingdayBO.getEndtime() : ""}
                </Typography>
              </Grid>
              <Grid item xs={12} />
              <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={
                    deleteTrainingday
                      ? this.deleteTrainingday
                      : this.trainingdayHandler
                  }
                  fullWidth
                >
                  <CheckIcon className={classes.backButton} color="primary" />
                  {deleteTrainingday ? "Trainingstag löschen" : "Aktualisieren"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={onClose}
                  fullWidth
                >
                  <ArrowBackOutlinedIcon
                    className={classes.backButton}
                    color="secondary"
                  />
                  Zurück zum Team
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

export default withStyles(styles)(UpdateTeam);
