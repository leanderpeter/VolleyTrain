import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingComp(show) {
  const classes = useStyles();
  return (
    show ? 
      <div className={classes.root}>
        <CircularProgress />
      </div>
    : 
    null
  );
}