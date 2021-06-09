import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import TrainingScheduleEntry from './TrainingScheduleEntry';
import VolleytrainAPI from '../api/VolleytrainAPI';

class TrainingSchedule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trainings: [],
            error: null
        }
    }

    getAllTrainings = () => {
        VolleytrainAPI.getAPI().getAllTrainings()
        .then(trainingBOs => {
            this.setState({
                trainings: trainingBOs,
                error: null
            })
        }).catch(e => {
            this.setState({
                trainings: [],
                error: e
            })
        });
        this.setState({
            error: null
        })
    }

    componentDidMount() {
        this.getAllTrainings();
    }

    render () {
        const { classes } = this.props;
        const { trainings } = this.state;

        return ( 
            <div className={classes.root}>
                <Grid>
                    <Typography className={classes.heading}>
                        Trainingspläne
                    </Typography>
                    <Grid>
                        { trainings ?
                        trainings.map (training => 
                            <TrainingScheduleEntry key={training.getID()} training={training}/>)
                        :
                        null }
                    </Grid>
                </Grid>
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
    }
});


export default withStyles(styles)(TrainingSchedule);