import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import BoxList from './BoxList.js'
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FullAutoCompleteBar from './FullAutoCompleteBar.js';
import { Series, DataFrame } from 'pandas-js';
import CSVReader1 from './FileReader.js'



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <CSVReader1/>
      </header>
      <body>
      </body>
    </div>
  );
}

export default App;