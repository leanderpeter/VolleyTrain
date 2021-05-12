import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';
import { withRouter } from 'react-router-dom';

/**
 * 
 * Zeigt den Header mit den verfügbaren Navigations Tabs.
 * Je nach Rolle (Student, Dozent, Admin) sind andere Tabs zum auswählen verfügbar.
 * 
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 * 
 * 
**/

class Header extends Component {
	constructor(props) {
    super(props);
  

		//init empty state
		this.state = {
			tabindex: 0
		};
	}
	// handles changes of the state of tabs component
	handleTabChange = (e, newIndex) => {
		this.setState({
			tabindex: newIndex
		})
	};
	// Rendert Komponente
	render() {
    const { classes, user, currentStudent, currentPerson } = this.props;
		return (
      <Paper className={classes.root} variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography className={classes.text1} variant='h3' component='h1' align='center'>
          HdM Wahlfach App
        </Typography>
        <Typography className={classes.text2} variant='h5' component='h2' align='center'>
        STUDIEREN. WISSEN. MACHEN.
        </Typography>
        {
          user ?
            
              <>
              {currentStudent ?
                <>
                <Paper variant='outlined'>
                  <Tabs indicatorColor='secondary' textColor='secondary' variant='fullWidth' centered value={this.state.tabindex} onChange={this.handleTabChange}>
                    <Tab label='Projektwahl' component={RouterLink} to={`/projekte`} />
                    <Tab label="Meine Projekte" component={RouterLink} to={'/meineprojekte'}/>
                    <Tab label="Semesterbericht" component={RouterLink} to={'/semesterbericht'}/>
                    <Tab label='About' component={RouterLink} to={`/about`} />
                  </Tabs>
                </Paper>
                </>
                :null
              }
              {currentPerson?
                <>
                  {currentPerson.rolle === "Dozent"?
                  <>
                  <Paper variant='outlined'>
                    <Tabs indicatorColor='secondary' textColor='secondary' variant='fullWidth' centered value={this.state.tabindex} onChange={this.handleTabChange}  >
                      <Tab label='Wahl' component={RouterLink} to={`/projekte`} />
                      <Tab label='Projektpflege' component={RouterLink} to={`/projektpflegen`} />
                      <Tab label='Projektverwaltung' component={RouterLink} to={`/projekteDozent`} />
                      <Tab label='About' component={RouterLink} to={`/about`} />
                    </Tabs>
                  </Paper>
                  </>
                  :null
                  }
                  {currentPerson.rolle === "Admin"?
                  <>
                  <Paper variant='outlined'>
                    <Tabs indicatorColor='secondary' textColor='secondary' centered value={this.state.tabindex} onChange={this.handleTabChange}  >
                      <Tab className={classes.tab} label='Wahl' component={RouterLink} to={`/projekte`} />
                      <Tab className={classes.tab} label='Pflege' component={RouterLink} to={`/projektpflegen`} />
                      <Tab className={classes.tab} label='Verwaltung' component={RouterLink} to={`/projekteDozent`} />
                      <Tab className={classes.tab} label='Prüfung' component={RouterLink} to={`/projektverwaltung`} />
                      <Tab className={classes.tab} label="Notenliste" component={RouterLink} to={'/notenliste'}/>
                      <Tab className={classes.tab} label='Administration' component={RouterLink} to={`/administration/semester`} />
                    </Tabs>
                  </Paper>
                  </>
                  :null
                  }
                </>
              :null
              }
            </>
            : null
        }
      </Paper>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  tab: {
    minWidth: 150, // a number of your choice
    width: 150, // a number of your choice
  },
  text1: {
    paddingLeft: '64px',
    marginTop: theme.spacing(2)
  },
  text2: {
    marginBottom: theme.spacing(2),
  },

});


// Prop Type
Header.propTypes = {
	// logged in Firebase user/person
	user: PropTypes.object,
}

export default withRouter(withStyles(styles)(Header));