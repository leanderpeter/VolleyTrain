import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ProfileDropDown from "../dialogs/ProfileDropDown";
import Box from "@material-ui/core/Box";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import GroupIcon from "@material-ui/icons/Group";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.info.contrastText,
    index: theme.palette.info.contrastText,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}></AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to={"/home"}>
            <ListItemIcon style={{ color: "white" }}>
              <AppsIcon />
            </ListItemIcon>
            Dashboard
          </ListItem>
          <ListItem button component={Link} to={"/createTraining"}>
            <ListItemIcon style={{ color: "white" }}>
              <FitnessCenterIcon />
            </ListItemIcon>
            Trainingsplanung
          </ListItem>
          <ListItem button component={Link} to={"/training"}>
            <ListItemIcon style={{ color: "white" }}>
              <AvTimerIcon />
            </ListItemIcon>
            Trainingspläne
          </ListItem>
          <ListItem button component={Link} to={'/exerciseoverview'}>
            <ListItemIcon style={{ color: "white" }}>
              <MenuBookIcon />
            </ListItemIcon>
            Übungen
          </ListItem>
          <ListItem button component={Link} to={"/teamoverview"}>
            <ListItemIcon style={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            Teams
          </ListItem>
        </List>
        <Divider />
        <List>
          <Box
            display="flex"
            flexWrap="wrap"
            alignContent="flex-end"
            justifyContent="center"
            css={{ maxWidth: drawerWidth, height: "60vh" }}
          >
            <ListItem>
              <ProfileDropDown user={props.user} />
            </ListItem>

            <ListItem button>
              <ListItemIcon style={{ color: "white" }}>
                <SettingsIcon />
              </ListItemIcon>
            </ListItem>
          </Box>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
