import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const DragStyle = {
  position: "absolute",
  cursor: "move",
};

function Player({ id, left, top, surname, name, passPlayerDeleteId }) {
  const classes = styles();

  const functionHandler = () => {
    passPlayerDeleteId(id);
  };

  // hover logic
  const [display, setDisplay] = useState(false);

  const showButton = (e) => {
    e.preventDefault();
    setDisplay(true);
  };

  const hideButton = (e) => {
    e.preventDefault();
    setDisplay(false);
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }

  return (
    <div
      ref={drag}
      style={{ ...DragStyle, left, top }}
      role="Box"
      className={classes.root}
    >
      <Grid>
        <Grid item xs>
          <div
            onMouseEnter={(e) => showButton(e)}
            onMouseLeave={(e) => hideButton(e)}
          >
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={
                display ? (
                  <IconButton
                    className={display}
                    onClick={functionHandler}
                    size="small"
                    aria-label="delete"
                  >
                    <ClearIcon />
                  </IconButton>
                ) : null
              }
            >
              <Avatar className={classes.orange}>
                {surname[0].toUpperCase() + name[0].toUpperCase()}
              </Avatar>
            </Badge>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

/** Component specific styles */
const styles = makeStyles({
  root: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
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
Player.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  expandedState: PropTypes.bool.isRequired,
  onExpandedStateChange: PropTypes.func.isRequired,
};

export default Player;
