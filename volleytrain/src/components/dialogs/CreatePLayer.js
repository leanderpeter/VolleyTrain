import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import React from "react";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import AddIcon from "@material-ui/icons/Add";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import PlayerBO from "../../api/PlayerBO";

class CreatePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      surname: "",
      name: "",
      role: "",
      shirtnumber: "",
    };
  }

  handleSurnameChange = (e) => {
    this.setState({
      surname: e.target.value,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleRoleChange = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  handleShirtnumberChange = (e) => {
    this.setState({
      shirtnumber: e.target.value,
    });
  };

  createPlayer = () => {
    let player = new PlayerBO();
    player.setID(1);
    player.setSurname(this.state.surname);
    player.setName(this.state.name);
    player.setTeamId(this.props.team.getID());
    player.setRole(this.state.role);
    player.setT_number(this.state.shirtnumber);
    this.props.createPlayer(player);
  };

  render() {
    const { classes, dialogOpen, onClose } = this.props;
    const { surname, name, role, shirtnumber } = this.state;

    return (
      <div>
        <Dialog className={classes.root} open={dialogOpen} onClose={onClose}>
          <DialogTitle>
            <Grid container>
              <Grid item xs={4}>
                <Button className={classes.border} onClick={onClose}>
                  <ArrowBackOutlinedIcon />
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Typography color="primary" variant="h5">
                  <b>Neuen Spieler anlegen</b>
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} />
              <Grid item xs={4}>
                <Typography color="primary">Vorname:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={6}>
                <TextField
                  color="primary"
                  onChange={this.handleNameChange}
                  fullWidth
                  value={name}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={4}>
                <Typography color="primary">Nachname:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={6}>
                <TextField
                  color="primary"
                  onChange={this.handleSurnameChange}
                  fullWidth
                  value={surname}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={4}>
                <Typography color="primary">Rolle:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={6}>
                <TextField
                  color="primary"
                  onChange={this.handleRoleChange}
                  fullWidth
                  value={role}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography color="primary">Trikot-Nummer:</Typography>
              </Grid>
              <Grid className={classes.border} item xs={6}>
                <TextField
                  color="primary"
                  onChange={this.handleShirtnumberChange}
                  fullWidth
                  value={shirtnumber}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={6}>
                <Button
                  onClick={this.createPlayer}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  <SaveAltIcon />
                  Speichern
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={onClose}
                  color="secondary"
                  variant="outlined"
                  fullWidth
                >
                  Abbrechen
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

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

export default withStyles(styles)(CreatePlayer);
