import React from 'react';
import {Button, Grid, Typography, MenuItem, Select, withStyles, TextField } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

class TrainingTime extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            weekdays: [1, 2, 3]
        }
    }

    handleDayChange = (e) => {
        this.setState({
            selectedDay: e.target.value,
        })
    }

    render() {
        const {classes, root, onChange, value, label} = this.props

        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography color="primary">Wochentag:</Typography>
                    </Grid>
                            <Grid className={classes.border} item xs={3}>
                                <Select onChange={onChange} value={value} fullWidth>
                                    {this.state.weekdays.map((day) => (
                                        <MenuItem value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={1}>
                                <Button className={classes.border}><DeleteOutlineOutlinedIcon /></Button>
                            </Grid>
                            <Grid item xs={5} />
                            <Grid item xs={3} />
                            <Grid item xs={3}>
                                <Typography color="primary">Beginn:</Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.border}>
                                <TextField type="time" onChange={this.handleTimeChange} value={this.state.time} fullWidth />
                                
                            </Grid>
                            <Grid item xs={3} />
                            <Grid item xs={3}>
                                <Typography color="primary">Ende:</Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.border}>
                                <TextField type="time" onChange={this.handleTimeChange} value={this.state.time} fullWidth />
                            </Grid>
                </Grid>
            </div>
        )
    }

}

/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2),
        width: '100%'
    },
    border: {
        border: '1px solid #3ECCA5',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 10px rgba(84, 78, 78, 0.2)',
        borderRadius: '9px',
        marginBottom: '15px',
        background: '#fcfcfc',
        
    },
    button: {
        color: '#ffffff',
        background: 'linear-gradient(90.46deg, #FFD542 12.09%, #FFB676 104.14%)',
        borderRadius: '9px',
        fontWeight: 'bold',
        fontVariant: 'normal',
    },
});

export default withStyles(styles)(TrainingTime);