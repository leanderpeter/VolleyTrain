import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Grid,
    Typography,
    withStyles,
} from '@material-ui/core';

/**
 * Render eine Seite für nicht eingeloggte Nutzer.
 * Dafür wird eine existierende Google Account Sign in Komponente verwendet.
 * Die Komponente nutzt eine Firebase für einen redirect.
 *
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 *
 */

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lnameValidationFailed: false,
            lnameEdited: false,
            fnameValidationFailed: false,
            fnameEdited: false,
            
        };
    }

    // Handles the click event of the sign in button and calls the prop onSignIn handler
    handleSignInButtonClicked = () => {
        setTimeout(() => {
            this.props.onSignIn();
        }, 0);
    }

    // Validierung der Textfeldaenderungen
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().lenght === 0) {
            error = true;
        }
        this.setState({
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    // rendert die  Komponente SignIn Seite
    render() {
        const {classes} = this.props;

        return <div>
                
                
                    <Typography className={classes.root} align='center' variant='h6'>Login</Typography>
                    <Typography style={{marginTop: "0em"}} classlname={classes.root} align='center'>Für die Nutzung der weiteren Funktionen müssen
                        Sie sich authentifizieren.</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button style={{marginBottom: "2em", marginTop: "1em"}} variant='contained' color='primary'
                                    onClick={this.handleSignInButtonClicked}
                                    >
                                SignIn with Google
                            </Button>
                        </Grid>
                    </Grid>
                
        </div>
    }
}


/** Component specific styles */
const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    formControl: {
        minWidth: 180
    },
    form: {
        marginTop: theme.spacing(1)
    }
});

/** PropTypes */
SignIn.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)