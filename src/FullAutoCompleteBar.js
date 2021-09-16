import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from "@material-ui/core/Card";
import Box from '@material-ui/core/Box';

import logo from './logo.svg';
import './App.css';
import BoxList from './BoxList.js'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    typographyCard: {
      "fontFamily": "Poppins",
      "fontSize": 20,
      "color": "#907952"
    },
    outstandingBoxContainer:{
      backgroundColor: "#45425A",
      borderRadius: "20px",
      minWidth: 900,
      maxHeight: 320,
      marginLeft: 120,
      marginBottom: 200,
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: "100%",
      '&::-webkit-scrollbar': {
        width: '0.45em',
        height: '0.1em',
        scrollMarginTop: '10px'
        
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        scrollMarginTop: '10px'
      },
      '&::-webkit-scrollbar-thumb': {
        height: '6px',
        backgroundColor: 'rgba(0,0,0,.3)',
        outline: '1px solid slategrey',
        borderRadius: '10px',
        scrollMarginTop: '10px'
      },
    },
    card:{
      borderRadius: 10,
      maxWidth: "200%",
    },
    minListWidth:{
      maxWidth: 1500,
      maxHeight: 500
    },
    typographyOutstandingTitle:{
      "fontFamily": "Poppins",
      "fontSize": 25,
      "color": "#907952", 
      textAlign: 'center'
    },
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
          // Default transform is "translate(14px, 20px) scale(1)""
          // This lines up the label with the initial cursor position in the input
          // after changing its padding-left.
          transform: "translate(34px, 20px) scale(1);"
        }
      },
      inputRoot: {
        color: "purple",
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
          // Default left padding is 6px
          paddingLeft: 26
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "green"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "red"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "purple"
        }
      }
    
  }));
  


function reformatResults(array) {
    return array.map(function(object) {
        var newObj = {};
        newObj = object.data
        newObj.title = (object.data["POLLNUM\nPolling division number \nformat NNNN (e.g. poll 0010 = poll 1)"] + "-" + object.data["SEQ_NUM\nSequence number (possibly where in the sequaence order the name appears on printed voters list by poll)\nformat NNNN (or blank)"]);
        return newObj
    })
}



export default function FullAutoCompleteBar(props) {
    const [SelectedID, setSelectedID] = useState({});
    const [Cards, setCards] = useState([]);
    const classes = useStyles;

    const handleChange = (event, value) => {
        setSelectedID(value)
        var temp = Cards
        setCards(temp => [<ListItem number={temp.length+1} selected={value}/>, ...temp])
    }

  return (
    <div style={{ width: 600 }}>
    <Grid
    container
    direction="row"
    justifyContent="space-evenly"
    alignItems="center"
    >
        <Grid style={{ width: 300 }}>
        <Autocomplete
            id="free-solo-demo"
            onChange={handleChange} // prints the selected value
            classes={classes}
            disableClearable
            options={reformatResults(props.data)}
            getOptionLabel={option => (option.title)}
            renderInput={(params) => (
            <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
            )}
        />
      </Grid>
      <Grid>
            <div id = "dynamicCards">
                <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                    {Cards}
                </Paper>
            </div>
      </Grid>
    </Grid>
    </div>
  );
}


const ListItem=(props)=> {
    const classes = useStyles();
    return (
      <Card className = {classes.card} style={{boxShadow: "none"}}>
        <Typography className = {classes.typographyCard} style={{fontWeight: 500}}>
          Card {props.number} 
          <br />
          {props.selected["GIVEN_NME\nGiven name\n"]} {props.selected["MIDDLE_NME\nMiddle name"]} {props.selected["FAMILY_NME\nFamily name"]} 
          <br />
          {props.selected["BLDGNUM                \nBuilding number\r\n"]}{props.selected["BLDGNUM_SFX            \nBuilding number suffix\nformat 1 Character"]} {props.selected["STREET_NME\nStreet name"]} {props.selected["STREET_TYP\nStreet type"]}{props.selected["STREET_DIR \r\nStreet direction"]
          ? <span> {props.selected["STREET_DIR \r\nStreet direction"]}</span>
          : null}{props.selected["UNITNUM\nUnit/apartment number\r\n"]
          ? <span>, Unit {props.selected["UNITNUM\nUnit/apartment number\r\n"]} </span>
          : null}
          <br />
          -------------
        </Typography>
        {/**Todo: Add a button to record the ID in SQL */}
      </Card>
    );
}
  