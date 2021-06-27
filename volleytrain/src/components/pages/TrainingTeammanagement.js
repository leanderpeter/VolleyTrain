import React, {useState} from 'react';
import {
    Select,
    Typography,
    makeStyles,
    InputLabel,
    FormControl ,
    MenuItem
} from '@material-ui/core';
import {Link} from 'react-router-dom';

import goBackIcon from '../../assets/goBackIcon.svg';



const TrainingTeammanagement = () => {

    // init styling
    const classes = styles();

    const [team, setTeam] = useState(null)
    const [teams, setTeams] = useState(
        [
            {
            name:"Team1",
            id:1
            },
            {
            name:"Team2",
            id:2
            },
        ]
    )

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer} >
                <Link to="/exerciseForm" >
                    <img src={goBackIcon} alt='' />
                </Link>
                <Typography className={classes.headingSelected}>
                    Teammanagement
                </Typography>
                <Link to="/trainingsablauf" className={classes.headingLink} >
                    <Typography className={classes.heading}>
                        Trainingsablauf
                    </Typography>
                </Link>
            </div>
            <div className={classes.selectContainer} >
                <FormControl variant="outlined" className={classes.teamauswahl} >
                    <InputLabel id="teamauswahl">Teamauswahl</InputLabel>
                    <Select 
                        label="Teamauswahl" 
                        value={team} 
                        onChange={(event)=>setTeam(event.target.value)}
                        >
                    {
                        teams.map(team =>{
                           return <MenuItem value={team}>{team.name}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
            </div>
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
    headerContainer:{
        display: "flex",
        alignItems:"flex-start",
    },
    heading: {
        fontSize: '21px',
        color: "black",
    },
    headingLink: {
        marginLeft: "30px",
        textDecorationLine: 'none',
    },
    headingSelected: {
        fontSize: '21px',
        textDecorationLine: 'underline',
        textDecorationColor: '#3ECCA5',
        marginLeft: "30px",
        color: "black",
    },
    selectContainer:{
        display: "flex",
        marginTop:"40px"
    },
    teamauswahl:{
        minWidth: 250
    }
  });

export default TrainingTeammanagement;