import React from 'react';
import { Grid, TextField, Typography, withStyles } from '@material-ui/core';
import ExerciseBO from '../../api/ExerciseBO'
import VolleytrainAPI from '../../api/VolleytrainAPI'


class ExerciseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameEdited: false,
            nameValidationFailed: false,
            goal: "",
            goalEdited: false,
            goalValidationFailed: false,
        }
    }

    addExercise(){
        let exercise = new ExerciseBO()
        exercise.setID(2)
        exercise.setTraining(1)
        exercise.setDuration(10)
        exercise.setName("nam")
        exercise.setGoal("goal")
        exercise.setDescription("desc")
        exercise.setNotes("notes")

        //VolleytrainAPI.getAPI().addExercise(exercise)

        //VolleytrainAPI.getAPI().getExerciseByID(1).then(res=>console.log(res))
        //VolleytrainAPI.getAPI().getExercises().then(res=>console.log(res))
        
        //VolleytrainAPI.getAPI().updateExercise(exercise)
        //VolleytrainAPI.getAPI().deleteExercise(2)
    }

    handleInputChange = (event) => {
        this.addExercise()
        const value = event.target.value;
    
        let error = false;
        if (value.trim().length === 0) {
          error = true;
        }
    
        this.setState({
          [event.target.id]: event.target.value,
          [event.target.id + 'ValidationFailed']: error,
          [event.target.id + 'Edited']: true
        });
      }

    render () {
        const { classes } = this.props;
        const { name, goal } = this.state;

        return ( 
            <div className={classes.root}>
                
                <Typography className={classes.heading}>
                    Übung erstellen
                </Typography>

                <TextField 
                    id="name"
                    label="Übungsname"
                    className={classes.inputName}
                    value={name}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                />

                <TextField 
                    id="goal"
                    label="Übungsziel"
                    className={classes.inputGoal}
                    value={goal}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                />
            <hr/>
            </div>
        )  
    }
}

const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        marginLeft: '280px', 
        marginRight: '50px'
    },
    heading: {
        fontSize: '21px',
        marginBottom: '20px',
        textDecorationLine: 'underline',
        textDecorationColor: '#3ECCA5'
    },
    notchedOutline: {
        borderColor: '#3ECCA5 !important'
    },
    inputName:{
        width: "40%",
        marginBottom: "30px"
    },
    inputGoal:{
        width: "90%",
        marginBottom: "30px"
    }
});


export default withStyles(styles)(ExerciseForm);