import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  withStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Container,
  Divider,
} from "@material-ui/core";
import TeamOverview from "./TeamOverview";
import DeleteTeam from "../dialogs/DeleteTeam";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import TrainingSchedule from "../TrainingSchedule";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PlayerOverview from './PlayerOverview';
import CreatePLayer from "../dialogs/CreatePLayer";
import AddIcon from '@material-ui/icons/Add'

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: this.props.location.state.team,
      dialogOpen: false,
      trainingdays: [],
      player: [],
      openNewPlayer: false
    };
  }

  handleClick = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  deleteTeam = () => {
    VolleytrainAPI.getAPI().deleteTeam(this.state.team.getID());
  };

  getPlayersForTeam = () => {
    VolleytrainAPI.getAPI()
      .getPlayerByTeam(this.state.team.getID())
      .then((playerBOs) =>
        this.setState({
          player: playerBOs,
          error: null,
          loadingInProgress: false,
        })
      )
      .catch((e) =>
        this.setState({
          player: [],
          error: e,
          loadingInProgress: false,
        })
      );
  };

  getTrainingdays = () => {
    VolleytrainAPI.getAPI()
      .getTrainingdaysByTeamID(this.state.team.getID())
      .then((trainingdayBOs) => {
        this.setState({
          trainingdays: trainingdayBOs,
        });
      });
  };

  calculateHours = (start) => {
    let starttime = new Date();
    starttime = start;
    console.log(starttime.getTime());
  };

  componentDidMount() {
    this.getTrainingdays();
    this.getPlayersForTeam()
  }
  openNewPlayer=()=>{
    this.setState({
      openNewPlayer: !this.state.openNewPlayer
    })
  }

  render() {
    const { classes } = this.props;
    const { team, dialogOpen, trainingdays, player,openNewPlayer } = this.state;

    return (
      <div className={classes.root}>
        <Tabs>
        <TabList>
            <Tab>Übersicht</Tab>
            <Tab>Spieler</Tab>
          </TabList>
        <TabPanel>
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          className={classes.border}
        >
          {console.log(trainingdays)}
          <Grid item xs={7}>
            <Typography variant="h5">{team.getName()}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Typography variant="h6">Trainingszeiten</Typography>
            {trainingdays.map((day) => (
              <Typography key={day.getID()}>
                {day.getWeekday()} {day.getStarttime()} - {day.getEndtime()} Uhr
              </Typography>
            ))}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Trainingsdauer</Typography>
            {trainingdays.map((day) => (
              <Typography key={day.getID()}>
                {day.getStarttime()} Stunde(n)
              </Typography>
            ))}
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Typography variant="h6">Verwalten</Typography>
            <Typography onClick={this.handleClick}>
              ... aktuelles Team bearbeiten
            </Typography>
            <Typography onClick={this.handleClick}>
              ... aktuelles Team löschen
            </Typography>
          </Grid>
        </Grid>
        <TrainingSchedule />
        <DeleteTeam
          dialogOpen={dialogOpen}
          team={team}
          deleteTeam={this.deleteTeam}
          onClose={this.handleClose}
        />
        </TabPanel>
        <TabPanel>
        <Button onClick={this.openNewPlayer} ><AddIcon/></Button>
        <Grid item xs={10}>
            {player.map((playerBOs) => (
              <Card className={classes.border}>
              <CardContent>
                <Grid container> 
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getSurname()}</b>
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem/>
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getName()}</b>
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem/>
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getT_number()}</b>
                    </Typography>  
                  </Grid>
                  <Divider orientation="vertical" flexItem/>
                  <Grid key={playerBOs.getID()} item xs={2}>
                    <Typography>
                      <b>{playerBOs.getRole()}</b>
                    </Typography>  
                  </Grid>
                </Grid>
              </CardContent>
              </Card>))}
            </Grid>
        </TabPanel>
        </Tabs>
        <CreatePLayer dialogOpen={openNewPlayer} onClose={this.openNewPlayer} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {
    marginLeft: 240,
  },
  link: {
    textDecoration: "None",
  },
  border: {
    margin: theme.spacing(2),
    border: "2px solid #BFCE0D",
    boxSizing: "border-box",
    alignItems: "center",
    textAlign: "left",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    background: "#fcfcfc",
  },
  papes: {
    margin: theme.spacing(2),
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
});

/** PropTypes */
Team.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /**
   * Handler function, which is called if the user wants to sign in.
   */
  onSignIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(Team);
