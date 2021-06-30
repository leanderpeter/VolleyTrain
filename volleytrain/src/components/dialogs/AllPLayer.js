import { withStyles, Card, Paper, CardContent, Button, Typography, Grid } from '@material-ui/core';
import React from 'react';
import { Link, } from 'react-router-dom';
import  VolleytrainAPI  from '../api/VolleytrainAPI';
import CreatePlayer from './CreatePlayer';


class AllPlayer extends React.Component {

    constructor(props) {
        super(props);
    
        // Init an empty state
        this.state = {
            players: [],
            error: null,
            loadingInProgress: false,
        };
      }
    
      handleClickOpen = () => {
        this.setState({
            dialogOpen: true
        })

    }
    
      getPlayers = () => {
        VolleytrainAPI.getAPI().getPlayersURL()
        .then(playerBO =>
            this.setState({            
              player: playerBO,
              loadingInProgress: false,   
              error: null
            })).catch(e =>
              this.setState({            
                player: [],
                loadingInProgress: false, 
                error: e
              })
        );
    
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }
      
      handleClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    componentDidMount() {
        this.getPlayers();
    }
    
    
      /** Rendern der Komponente */
      render() {
        const { classes } = this.props;
        const { players, dialogOpen } = this.state;
    
        return(
            <div>
                <Grid spacing={3} container direction="row" justify="center" className={classes.root}>
                
                    {players.map((playerBO) => (

                    
                        <Grid key={playerBO.getID()} item>
                            <Link to={{pathname: "/players", state: {player: playerBO}}} className={classes.link} player={playerBO}>
                                <Paper className={classes.papes}>
                                    <Typography>{playerBO.getName()}</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                    
                    <Grid item>
                        <Paper className={classes.border} variant="outlined" onClick={this.handleClickOpen} color="secondary">
                                <Button>Spieler erstellen</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <CreatePlayer dialogOpen={dialogOpen} onClose={this.handleClose} />
            </div>
        )
    }
}
    
/** Component specific styles */
const styles = (theme) => ({
    root: {
      margin: theme.spacing(2),
      width: "80%",
      marginLeft: "20%",
    },
    link: {
      textDecoration: "None",
    },
    border: {
      boxSizing: "border-box",
      alignItems: "center",
      textAlign: "center",
      boxShadow: "0px 4px 10px rgba(84, 78, 78, 0.2)",
      borderRadius: "9px",
      background: "linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)",
      width: theme.spacing(26),
      height: theme.spacing(18),
    },
    papes: {
      background:
        "linear-gradient(80.45deg, #071168 -35.38%, #1F9F80 -9.15%, #BFCE0D 114.78%)",
      borderRadius: "9px",
      fontWeight: "bold",
      fontVariant: "normal",
      color: "#ffffff",
      alignItems: "center",
      textAlign: "center",
      width: theme.spacing(26),
      height: theme.spacing(18),
    },
    button: {
      color: "#ffffff",
      background: "linear-gradient(90.46deg, #FFD542 12.09%, #FFB676 104.14%)",
      borderRadius: "9px",
      fontWeight: "bold",
      fontVariant: "normal",
    },
    solid: {
      border: "1px solid #bbb",
      marginLeft: "280px",
      marginRight: "50px",
    }
  });
  
export default withStyles(styles)(AllPlayer);
