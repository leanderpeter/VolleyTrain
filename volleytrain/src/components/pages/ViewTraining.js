import React, { useState, useLayoutEffect } from "react";
import {
    makeStyles,
  } from "@material-ui/core";
import { useLocation} from "react-router-dom";

const TrainingTeammanagement = () => {
    // init styling
    const classes = styles();

    // get props from link from TrainingScheduleEntry.js
    const location = useLocation()
    const training  = location.training
  
    //call function when render
    useLayoutEffect(() => {
    }, []);
  
    return (
      <div className={classes.root}>
        display Exercises here
      </div>
    );
  };
  
  /** Component specific styles */
  const styles = makeStyles({
    root: {
      margin: "auto",
      marginLeft: "280px",
      marginRight: "50px",
    }
  });
  
  export default TrainingTeammanagement;