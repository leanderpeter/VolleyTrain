import { withStyles, Paper, Typography, Grid } from "@material-ui/core";
import React from "react";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import { BrowserRouter as Link } from "react-router-dom";

class PlayerOverview extends React.Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      player: [],
      error: null,
      loadingInProgress: false,
      loading: true,
    };
  }

  handleClickOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  getPlayers = (playername) => {
    VolleytrainAPI.getAPI()
      .getPlayers(playername)
      .then((PlayerBO) => {
        this.setState({ player: PlayerBO.getID() });
      })
      .catch((e) => {
        this.setState({
          player: [],
          error: e,
        });
      });
    this.setState({
      error: null,
    });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    const { classes } = this.props;
    const { player } = this.state;

    return (
      <div>
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          className={classes.root}
        >
          {player.map((playerBO) => (
            <Grid key={playerBO.getID()} item>
              <Link
                to={{ pathname: "/players", state: { player: playerBO } }}
                className={classes.link}
                player={playerBO}
              >
                <Paper className={classes.papes}>
                  <Typography>
                    <b>{playerBO.getName()}</b>
                  </Typography>
                  <Typography>
                    <b>{playerBO.getSurname()}</b>
                  </Typography>
                  <Typography>
                    <b>{playerBO.getRole()}</b>
                  </Typography>
                  <Typography>
                    <b>{playerBO.getT_number()}</b>
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
            ></Paper>
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
    border: "2px solid #3ECCA5",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
  divider: {
    backgroundColor: "black",
  },
});

export default withStyles(styles)(PlayerOverview);
