import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";

function PlayerButton(props) {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Grid>
        <Grid item xs>
          <Avatar className={classes.orange}>
            {props.player.name[0] + props.player.surname[0]}
          </Avatar>
        </Grid>
      </Grid>
    </div>
  );
}

/** Component specific styles */
const styles = makeStyles({
  root: {},
  orange: {
    color: deepOrange[500],
    backgroundColor: deepOrange[100],
  },
  purple: {
    color: deepPurple[500],
    backgroundColor: deepPurple[100],
  },
});

/** PropTypes */
PlayerButton.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  expandedState: PropTypes.bool.isRequired,
  onExpandedStateChange: PropTypes.func.isRequired,
};

export default PlayerButton;
