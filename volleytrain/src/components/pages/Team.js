import { withStyles, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import React from 'react';
import CreateTeam from '../dialogs/CreateTeam';

class Team extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            dialogOpen: false,

        }
    }

    handleClickOpen = () => {
        this.setState({
            dialogOpen: true
        })

    }

    handleClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    render() {
        const {classes} = this.props;
        const {dialogOpen} = this.state;

        return(
            <div>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item xs={8}>
                        <Card className={classes.root} variant="outlined" onClick={this.handleClickOpen} color="secondary">
                            <CardContent>
                                <Button color="primary">Team erstellen</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <CreateTeam dialogOpen={dialogOpen} onClose={this.handleClose} />
            </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    
});

export default withStyles(styles)(Team);