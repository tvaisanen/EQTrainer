import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors


var config = {
  apiKey: "AIzaSyCsY5V6Uy7V9SHPYF7v9O5xSTiYiMwRbHg",
  authDomain: "eq-ear.firebaseapp.com",
  databaseURL: "https://eq-ear.firebaseio.com",
  projectId: "eq-ear",
  storageBucket: "",
  messagingSenderId: "677468603973"
};
firebase.initializeApp(config);



window.debug = true;

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);