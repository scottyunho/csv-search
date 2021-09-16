import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse';
import FullAutoCompleteBar from './FullAutoCompleteBar.js';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';




const buttonRef = React.createRef()

export default class CSVReader1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        csvInfo: []
    };
  }


  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    this.setState({csvInfo: data});
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          config={{header:true}}
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  border: "none",
                  padding: "20px",
                  margin: "4px 2px",
                  borderCollapse: 'collapsed',
                  borderRadius: "50% !important",
                  background: "#D3D3D3",
                  marginLeft: 0,
                  marginRight: 0,
                  width: '400px',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 0,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '50px'
                }}
              >
              </div>
              <button
                style={{
                    border: "none",
                    padding: "20px",
                    margin: "4px 2px",
                    borderCollapse: 'collapsed',
                    borderRadius: "50% !important",
                    background: "#D3D3D3",
                    marginLeft: 0,
                    marginRight: 0,
                    width: '100px',
                    paddingLeft: 0,
                    paddingRight: 0
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid direction = "row" justify = "right" spacing={1}>

            <FullAutoCompleteBar data={this.state.csvInfo}/>
          </Grid>
        </Grid>
      </>
    )
  }
}
