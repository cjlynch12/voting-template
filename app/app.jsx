import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Link, Route } from 'react-router-dom';


/* Import Components */
import HelloWorld from './components/HelloWorld';
import Base from './containers/Base';

ReactDOM.render((
  <MuiThemeProvider>
    <Base />
  </MuiThemeProvider>), document.getElementById('main'));