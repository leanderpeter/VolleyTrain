import React, {Component} from 'react';
import {
    Button,
    Typography,
    makeStyles,
    Grid
} from '@material-ui/core';

import newTrainingIcon from '../../assets/newTrainingIcon.png';

const CreateTraining = () => {

    // init styling
    const classes = styles();

    return (
        <div className={classes.root}>
              <Grid>
                    <Typography className={classes.heading}>
                        Trainingsplan
                    </Typography>
                    <Grid>
                        <div className={classes.container} >
                            <img src={newTrainingIcon} alt='' className={classes.img} />
                            <Typography className={classes.title} >
                                Neuen Trainingsplan anlegen
                            </Typography>
                        </div>
                        <div className={classes.container} >
                            <img src={newTrainingIcon} alt='' className={classes.img} />
                            <Typography className={classes.title} >
                                Bestehenden Trainingsplan bearbeiten
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
        </div>
    )
}
/** Component specific styles */
const styles = makeStyles({
    root: {
        margin: "auto",
        marginLeft: '280px', 
        marginRight: '50px'
    },
    heading: {
        fontSize: '21px',
        marginBottom: '20px',
        textDecorationLine: 'underline',
        textDecorationColor: '#0B3298',
        marginBottom: "100px"
    },
    container: {
        border: '2px solid #0B3298',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 10px rgba(84, 78, 78, 0.2)',
        borderRadius: '9px',
        marginBottom: '15px',
        height:"200px",
        display: "flex",
        marginBottom: "30px"
    },
    img:{
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft:"50px"
    },
    title:{
        fontSize:"250%",
        margin: "auto"

    }
  });

export default CreateTraining;