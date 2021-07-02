import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { Link } from "react-router-dom";

class DeleteTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, deleteDialogOpen, onClose, team, deleteTeam } = this.props;

    return (
      <div>
        <Dialog
          className={classes.root}
          open={deleteDialogOpen}
          onClose={onClose}
        >
          <DialogTitle>
            <Typography variant="h6" color="primary">
              Möchtest du die <b>{team.getName()}</b> wirklich löschen?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link className={classes.link} to={{ pathname: "/home" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={deleteTeam}
                    fullWidth
                  >
                    {" "}
                    <b>LÖSCHEN</b>
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={onClose}
                  fullWidth
                >
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
  link: {
    textDecoration: "None",
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
});

export default withStyles(styles)(DeleteTeam);
