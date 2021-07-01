import React, { useState, useLayoutEffect } from "react";
import {
  Select,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const ExerciseComponent = (exercise) => {
  // init styling
  const classes = styles();

  const [exerciseBO, setExercise] = useState(exercise);

  return (
    <div>
      <Grid item xs={10}>
        <Card className={classes.border}>
          <CardContent>
            <Grid>
              <Grid key={exerciseBO.getID()} item>
                <Typography>Übungsname:</Typography>
                <Typography>
                  <b>{exerciseBO.getName()}</b>
                </Typography>
              </Grid>
              <Divider className={classes.solid} />
              <Grid key={exerciseBO.getID()} item>
                <Typography>Übungsziel:</Typography>
                <Typography>
                  <b>{exerciseBO.getGoal()}</b>
                </Typography>
              </Grid>
              <Divider className={classes.solid} />
              <Grid key={exerciseBO.getID()} item>
                <Typography>Beschreibung:</Typography>
                <Typography>
                  <b>{exerciseBO.getDescription()}</b>
                </Typography>
              </Grid>
              <Divider className={classes.solid} />
              <Grid key={exerciseBO.getID()} item>
                <Typography>Bewertung:</Typography>
                <Typography>
                  <b>{exerciseBO.getRating()}</b>
                </Typography>
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
    border: "2px solid #3ECCA5",
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
    borderRadius: "9px",
    marginBottom: "15px",
  },
  heading: {
    fontSize: "21px",
    marginBottom: "20px",
    textDecorationLine: "underline",
    textDecorationColor: "#3ECCA5",
  },
  solid: {
    border: "1px solid #bbb",
    marginLeft: "0px",
    marginRight: "0px",
  },
});

export default ExerciseComponent;
