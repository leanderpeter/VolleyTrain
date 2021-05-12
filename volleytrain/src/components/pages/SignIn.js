import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Button,
    Grid,
    Typography,
    withStyles,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
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
            nameValidationFailed: false,
            nameEdited: false,
            surnameValidationFailed: false,
            surnamenameEdited: false,
            
        };
    }

    // Handles the click event of the sign in button and calls the prop onSignIn handler
    handleSignInButtonClicked = () => {
        document.cookie = `rolle= ${this.state.rolle};path=/`
        document.cookie = `name= ${document.getElementById('name').value};path=/`
        if (this.state.rolle === 'Student') {
            document.cookie = `kuerzel= ${document.getElementById('kuerzel').value};path=/`
            document.cookie = `mat_nr= ${document.getElementById('mat_nr').value};path=/`
        }
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

    numberValueChange = (event) => {
        const value = event.target.value;
        const re = /^[0-9]{1,6}$/;

        let error = false;
        if (value.trim().lenght === 0) {
            error = true;
        }
        if (re.test(event.target.value) === false) {
            error = true;
        }
        this.setState({
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    // rendert die  Komponente SignIn Seite
    render() {
        const {
            
            nameValidationFailed,
            nameEdited,
            surnameValidationFailed,
            surnameEdited,
            
        } = this.state;
        const {classes} = this.props;

        console.log(nameValidationFailed)
        console.log(surnameValidationFailed)

        return <div>
            <Paper>
                <Card>
                    <Typography className={classes.root} align='center' variant='h6'>Willkommen zu Volleytrain</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            <form className={classes.form} autoComplete="on">
                                <TextField id="name" label="Name" error={nameValidationFailed}
                                           onChange={this.textFieldValueChange}/>
                                <TextField id="name" label="Nachname" error={surnameValidationFailed}
                                           onChange={this.textFieldValueChange}/>
                            </form>
                        </Grid>
                    </Grid>
                    <Typography className={classes.root} align='center'>Für die Nutzung der weiteren Funktionen müssen
                        Sie sich authentifizieren.</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button style={{marginBottom: "2em"}} variant='contained' color='primary'
                                    onClick={this.handleSignInButtonClicked}
                                    disabled={ nameValidationFailed || !nameEdited || surnameValidationFailed || !surnameEdited}>
                                Anmelden
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Paper>
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