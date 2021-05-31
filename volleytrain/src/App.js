import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app'; //Firebase module
import 'firebase/auth'; //Firebase module
import Grid from '@material-ui/core/Grid';

// import Componentents from '/components/';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import VolleytrainAPI from './api/VolleytrainAPI';
import firebaseConfig from './firebaseconfig';
import Home from './components/pages/Home';
import Header from './components/layout/Header';
import TrainingSchedule from './components/TrainingSchedule';

/*
Main page of the volleytrain. First firebase to verify users. Then routing to the pages via react-router-dom
*/

class App extends React.Component {
  // initialize firebase
  constructor(props){
    super(props);

    // initialize empty values
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false,
      currentStudent: null,
      currentPerson: null
    };
  }
  // creating error boundry. receiving all errors below the component tree

  static getDerivedStateFromError(error) {
    // update state for fallback UI
    return { appError: error };
  }
  
  // handles all user login states with firebase
  handleAuthStateChange = user => {
    if (user) {
      this.setState({
        authLoading: true, 
      });
      // user signed in
      user.getIdToken().then(token => {
        // Token gets storend into cookie
        // Server (backend) can then read out that cookie
        // only token information, safety risk!
        document.cookie = `token=${token};path=/`;
        // set user when token arrives
        this.setState({
          currentUser: user,
          authError: null,
          authLoading: false
        })}).then(() => {
        this.getUserByGoogleID()
      }).catch(e => {
        this.setState({
          authError: e,
          authLoading: false
        });
      });
    } else {
      // user loggend out -> clear id token
      document.cookie = 'token=;path=/';

      // Set the logged out user to null
      this.setState({
        currentUser: null,
        authLoading: false
      });
    }
  }

  // handles the sign in component with firebase.auth()
  handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  //aktuell eingeloggten Student vom Backend abfragen
  getUserByGoogleID = () => {

      VolleytrainAPI.getAPI().getUserByGoogleID(this.state.currentUser.uid)
        .then(userBO =>
            this.setState({
                currentUser: userBO,
                error: null,
                loadingInProgress: false,
            })
            ).catch(e =>
                this.setState({
                    currentUser: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true
        });
    
    setTimeout(()=>{
      console.log(this.state);
    },1000);
    }
    
    //openbook getcookie von Galileo
    getCookie = (name) => {
      var i=0;  //Suchposition im Cookie
      var suche = name + "=";
      while (i<document.cookie.length) {
         if (document.cookie.substring(i, i + suche.length) === suche) {
            var ende = document.cookie.indexOf(";", i + suche.length);
            ende = (ende > -1) ? ende : document.cookie.length;
            var cook = document.cookie.substring(i + suche.length, ende);
            return unescape(cook);
         }
         i++;
      }
      return "";
   }


  // lifecycle method
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  render() {
    const { currentUser, appError, authError, authLoading, currentStudent, currentPerson } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline/>
        <Router>
            {
              currentUser ?
              <>
              <Header user={currentUser}/>
              <Redirect from='/' to='home' />
                  <Route path='/home' component ={Home}>
                    {/* <Home/> */}
                    <TrainingSchedule/>
                  </Route>

              </>
              :
              <>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={8}>
                <Redirect to='/index.html' />
                <SignIn onSignIn={this.handleSignIn} />
                </Grid>
            </Grid>
              </>
            }
        </Router>
      </ThemeProvider>
    );

  }
}

export default App;