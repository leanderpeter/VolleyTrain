import React from 'react';
import { TextField, Typography, withStyles, Button } from '@material-ui/core';
import ExerciseBO from '../../api/ExerciseBO'
import VolleytrainAPI from '../../api/VolleytrainAPI'
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';

class ExerciseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingInProgress: false,
            error: null,
            name: "",
            nameEdited: false,
            nameValidationFailed: false,
            goal: "",
            goalEdited: false,
            goalValidationFailed: false,
            duration: "",
            durationEdited: false,
            durationValidationFailed: false,
            description: "",
            descriptionEdited: false,
            descriptionValidationFailed: false,
            notes: "",
            notesEdited: false,
            notesValidationFailed: false,
        }
    }

    addExercise = () => {
        let exercise = new ExerciseBO()
        exercise.setTraining(1)
        exercise.setDuration(this.state.duration !=='' ? this.state.duration : null)
        exercise.setName(this.state.name)
        exercise.setGoal(this.state.goal)
        exercise.setDescription(this.state.description)
        exercise.setNotes(this.state.notes)

        VolleytrainAPI.getAPI().addExercise(exercise).then(() =>
            this.setState({
                error: null,
                loadingInProgress: false,
                name: "",
                duration: "",
                goal: "",
                description: "",
                notes: ""
            })
            ).catch(e =>
                this.setState({
                    error: e,
                    loadingInProgress: false,
                    name: "",
                    duration: "",
                    goal: "",
                    description: "",
                    notes: ""
                }));
        this.setState({
            error: null,
            loadingInProgress: true
        });
    }

    handleInputChange = (event) => {
        
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
        const { 
            name, 
            goal, 
            duration, 
            description, 
            notes, 
            error, 
            loadingInProgress,
            nameEdited, 
            nameValidationFailed, 
            descriptionEdited, 
            descriptionValidationFailed, 
        } = this.state;

        return ( 
            <div className={classes.root}>
                
                <Typography className={classes.heading}>
                    Übung erstellen
                </Typography>

                <TextField 
                    id="name"
                    label="Übungsname"
                    className={classes.mediumInput}
                    value={name}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                    error={nameValidationFailed}
                />

                <TextField 
                    id="goal"
                    label="Übungsziel"
                    className={classes.bigInput}
                    value={goal}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                />

                <TextField 
                    id="duration"
                    label="Übungsdauer in Minuten"
                    className={classes.smallInput}
                    value={duration}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                    error={isNaN(duration)}
                    helperText={isNaN(duration)?'Nur Zahlen sind erlaubt':''}
                />

                <TextField 
                    id="description"
                    label="Beschreibung"
                    multiline
                    rows={2}
                    rowsMax={Infinity}
                    className={classes.bigInput}
                    value={description}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                    error={descriptionValidationFailed}
                />

                <TextField 
                    id="notes"
                    label="Notizen"
                    multiline
                    rows={2}
                    rowsMax={Infinity}
                    className={classes.bigInput}
                    value={notes}
                    onChange={this.handleInputChange}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline,
                        },
                    }}
                    variant="outlined" 
                />
                <hr/>

                <Button
                 className={classes.saveButton} 
                 onClick={this.addExercise} 
                 disabled={
                    isNaN(duration) || !nameEdited || nameValidationFailed || 
                    !descriptionEdited || descriptionValidationFailed
                    }
                 >
                    Übung Erstellen
                </Button>
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage 
                    error={error} 
                    contextErrorMsg = {'Die Übung konnten nicht gespeichert werden'} 
                    onReload={this.addExercise} 
                    /> 
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
    mediumInput:{
        width: "40%",
        marginBottom: "30px"
    },
    bigInput:{
        width: "90%",
        marginBottom: "30px"
    },
    smallInput:{
        width: "30%",
        marginBottom: "30px"
    },
    saveButton:{
        background: "linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)",
        borderRadius: "9px",
        color: "white",
    }
});


export default withStyles(styles)(ExerciseForm);