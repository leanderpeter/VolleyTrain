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
import VolleytrainAPI from "../../api/VolleytrainAPI";
import TrainingTime from "../assets/TrainingTime";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import TeamBO from "../../api/TeamBO";

class DeleteTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, dialogOpen, onClose, team, deleteTeam } = this.props;

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
                  <b>Team löschen</b>
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">
                  Möchtest du die <b>{team.getName()}</b> wirklich löschen?
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Link to={{ pathname: "/home" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={deleteTeam}
                  >
                    {" "}
                    <b>LÖSCHEN</b>
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button color="secondary" variant="outlined" onClick={onClose}>
                  {" "}
                  <b>ABBRECHEN</b>
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
    border: "1px solid #3ECCA5",
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
});

export default withStyles(styles)(DeleteTeam);
