import React, { useState, useLayoutEffect } from "react";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const ExerciseComponent = ({ exerciseBO }) => {
  // init styling
  const classes = styles();

  return (
    <div>
      <Grid item xs={10}>
        <Card className={classes.border}>
          <CardContent>
            <Grid>
              <Grid key={exerciseBO.id} item>
                <Typography>Übungsname:</Typography>
                <Typography>{exerciseBO.name}</Typography>
              </Grid>
              <Divider className={classes.solid} />
              <Grid key={exerciseBO.id} item>
                <Typography>Übungsziel:</Typography>
                <Typography>{exerciseBO.goal}</Typography>
              </Grid>
              <Divider className={classes.solid} />
              <Grid key={exerciseBO.id} item>
                <Typography>Beschreibung:</Typography>
                <Typography>{exerciseBO.description}</Typography>
              </Grid>
              <Divider className={classes.solid} />
              <Grid key={exerciseBO.id} item>
                <Typography>Bewertung:</Typography>
                <Typography>{exerciseBO.rating}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
/** Component specific styles */
const styles = makeStyles({
  root: {
    width: "80%",
    marginLeft: "20%",
  },
  link: {
    textDecoration: "None",
  },
  border: {
    border: "2px solid #0B3298",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
  heading: {
    fontSize: "21px",
    marginBottom: "20px",
    textDecorationLine: "underline",
    textDecorationColor: "#0B3298",
  },
  solid: {
    border: "1px solid #bbb",
    marginLeft: "0px",
    marginRight: "0px",
  },
});

export default ExerciseComponent;
