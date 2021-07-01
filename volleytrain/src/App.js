import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {
  withStyles,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@material-ui/core";
import firebase from "firebase/app"; //Firebase module
import "firebase/auth"; //Firebase module
import Grid from "@material-ui/core/Grid";
import Link from "react-router-dom";

// import Componentents from '/components/';
import theme from "./Theme";
import SignIn from "./components/pages/SignIn";
import VolleytrainAPI from "./api/VolleytrainAPI";
import firebaseConfig from "./firebaseconfig";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import TrainingSchedule from "./components/TrainingSchedule";
import Team from "./components/pages/Team";
import TeamOverview from "./components/pages/TeamOverview";
import ExerciseForm from "./components/pages/exerciseForm";
import Exercises from "./components/Exercises";
import CreateExercise from "./components/dialogs/CreateExercise";
import BlankPage from "./components/pages/BlankPage";
import PlayerOverview from "./components/pages/PlayerOverview";
import ExerciseOverview from "./components/pages/ExerciseOverview";
import TrainingPlaningPage from "./components/pages/TrainingPlaningPage";
import TrainingTeammanagement from "./components/pages/TrainingTeammanagement";

/*
Main page of the volleytrain. First firebase to verify users. Then routing to the pages via react-router-dom
*/

class App extends React.Component {
  // initialize firebase
  constructor(props) {
    super(props);

    // initialize empty values
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false,
      currentStudent: null,
      currentPerson: null,
    };
  }
  // creating error boundry. receiving all errors below the component tree

  static getDerivedStateFromError(error) {
    // update state for fallback UI
    return { appError: error };
  }

  // handles all user login states with firebase
  handleAuthStateChange = (user) => {
    if (user) {
      this.setState({
        authLoading: true,
      });
      // user signed in
      user
        .getIdToken()
        .then((token) => {
          // Token gets storend into cookie
          // Server (backend) can then read out that cookie
          // only token information, safety risk!
          document.cookie = `token=${token};path=/`;
          // set user when token arrives
          this.setState({
            currentUser: user,
            authError: null,
            authLoading: false,
          });
        })
        .then(() => {
          this.getUserByGoogleID();
        })
        .catch((e) => {
          this.setState({
            authError: e,
            authLoading: false,
          });
        });
    } else {
      // user loggend out -> clear id token
      document.cookie = "token=;path=/";

      // Set the logged out user to null
      this.setState({
        currentUser: null,
        authLoading: false,
      });
    }
  };

  // handles the sign in component with firebase.auth()
  handleSignIn = () => {
    this.setState({
      authLoading: true,
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  //aktuell eingeloggten Student vom Backend abfragen
  getUserByGoogleID = () => {
    VolleytrainAPI.getAPI()
      .getUserByGoogleID(this.state.currentUser.uid)
      .then((userBO) =>
        this.setState({
          currentUser: userBO,
          error: null,
          loadingInProgress: false,
        })
      )
      .catch((e) =>
        this.setState({
          currentUser: null,
          error: e,
          loadingInProgress: false,
        })
      );
    this.setState({
      error: null,
      loadingInProgress: true,
    });
  };

  // lifecycle method
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().languageCode = "en";
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  render() {
    const { classes } = this.props;
    const { currentUser } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {currentUser ? (
            <>
              <Header user={currentUser} />
              <Redirect from="/" to="home" />
              <Route path="/home" component={Home}>
                <Home />
              </Route>
              <Route path="/training" component={Home}>
                <TrainingSchedule />
              </Route>
              <Route
                path="/teamoverview"
                render={(props) => (
                  <TeamOverview {...props} currentUser={currentUser} />
                )}
              />
              <Route path="/team" render={(props) => <Team {...props} />} />
              <Route path="/teammanagement" component={TrainingTeammanagement}>
                <TrainingTeammanagement />
              </Route>
              <Route path="/createTraining" component={TrainingPlaningPage}>
                <TrainingPlaningPage />
              </Route>
              <Route path="/exercises" component={BlankPage}>
                <BlankPage />
              </Route>
              <Route path="/exerciseoverview" component={ExerciseOverview}></Route>
              <Route path="/playeroverview" component={PlayerOverview}></Route>
            </>
          ) : (
            <>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
              >
                <Grid item xs={8}>
                  <Redirect to="/index.html" />
                  <SignIn onSignIn={this.handleSignIn} />
                </Grid>
              </Grid>
            </>
          )}
        </Router>
      </ThemeProvider>
    );
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {},
  formControl: {
    minWidth: 180,
  },
  form: {
    marginTop: theme.spacing(1),
  },
});

export default withStyles(styles)(App);
