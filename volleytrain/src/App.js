import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app'; //Firebase module
import 'firebase/auth'; //Firebase module

// import Componentents from '/components/';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';

  // handles the sign in component with firebase.auth()
  const handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }


function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline/>
      <Router>
        <Container maxWidth="md">
          <Redirect to='/index.html' />
          <SignIn onSignIn={handleSignIn} />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
