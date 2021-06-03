import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const darkgrey = '#808080';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    black,
    white,
    darkgrey,
    primary: {
      contrastText: white,
      dark: colors.blueGrey[400],
      main: colors.blueGrey[600],
      light: colors.blueGrey[100]
    },
    secondary: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[700],
      light: colors.red[100]
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400]
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400]
    },
    warning: {
      contrastText: white,
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400]
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    text: {
      primary: colors.blueGrey[800],
      secondary: colors.blueGrey[600],
      link: colors.blue[600]
    },
    extra: {
      contrastText: '#c4c4c4',
      dark: '#c4c4c4',
      main: '#c4c4c4',
      light: '#c4c4c4'
    },
    background: {
      default: '#F4F6F8',
      paper: white
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200]
  }, 
});


// A custom theme for this app
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });


export default theme;