import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FormControl, FormLabel, FormControlLabel, Radio, 
         RadioGroup, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import ResponseView from './ResponseView';

const useStyles = makeStyles(theme => ({

}));

function StoragePUT() {
  const classes = useStyles();

  // State
  const [typeValue, setTypeValue] = React.useState('shared');
  const [showUserName, setShowUserName] = React.useState(false);
  const userInputStyle = showUserName ? {} : {display: 'none'};
  const [showDocName, setShowDocName] = React.useState(true);
  const docInputStyle = showDocName ? {} : {display: 'none'};
  const [docName, setDocName] = React.useState('');
  const [dbValue, setDBValue] = React.useState("client-shared-storage");
  const [uploadTypeValue, setUploadTypeValue] = React.useState('input');
  const [className, setClassName] = React.useState('');
  const [docBody, setDocBody] = React.useState('');
  const [userID, setUserID] = React.useState('');
  const [responseReturn, setResponseReturn] = React.useState({});

  function handleTypeChange(event) {
    const newStorageType = event.target.value;
    setTypeValue(newStorageType);
    newStorageType == 'user' ? setShowUserName(true) : setShowUserName(false);
  }

  function handleUploadTypeChange(event) {
    const newQueryType = event.target.value;
    setUploadTypeValue(newQueryType);
    newQueryType == "input" ? setShowDocName(true) : setShowDocName(false);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const ending = uploadTypeValue == "input" ? "/" + docName : "";
    let path = "";
    if (typeValue == "user") {
        path = "/" + dbValue + "/v1/users/" + userID + "/classes/" + className + "/documents" + ending;
    } else {
        path = "/" + dbValue + "/v1/" + typeValue +  "/classes/" + className + "/documents" + ending;
    }

    const config = {headers: {
      'Content-Type': 'application/json',
    }}
    if (uploadTypeValue == 'input') {
        axios.put(path, docBody, config)
        .then(response => {
            setResponseReturn(response);
        })
        .catch(error => console.log(error));
    } else {
      axios.post(path, docBody, config)
        .then(response => {
            setResponseReturn(response);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>Storage Source</FormLabel>
          <Select
            value={dbValue}
            onChange={(e) => {setDBValue(e.target.value)}}
          >

            <MenuItem value="client-shared-storage">client-shared-storage</MenuItem>
            <MenuItem value="client-user-storage">client-user-storage</MenuItem>
            <MenuItem value="server-shared-storage">server-shared-storage</MenuItem>
            <MenuItem value="server-user-storage">server-user-storage</MenuItem>
          </Select>

          <FormLabel>Storage Type</FormLabel>
          <RadioGroup
            aria-label="storage-type"
            name="storage-type-choices"
            value={typeValue}
            onChange={handleTypeChange}
            row
          >
            <FormControlLabel value="shared" control={<Radio color="primary" />} label="Shared" />
            <FormControlLabel value="user" control={<Radio color="primary" />} label="User" />
          </RadioGroup>
          <TextField 
            variant="outlined" 
            label="User"
            style={userInputStyle} 
            onChange={(e) => {setUserID(e.target.value)}}
          />

          <TextField 
            variant="outlined" 
            label="Class"
            onChange={(e) => {setClassName(e.target.value)}} 
          />
          <Divider />

          <Divider />
          <RadioGroup
            value={uploadTypeValue}
            aria-label="search-type"
            name="search-type-choices"
            onChange={handleUploadTypeChange}
            row
          >
            <FormControlLabel value="input" control={<Radio color="primary" />} label="Input Document Name" />
            <FormControlLabel value="generate" control={<Radio color="primary" />} label="Generate" />
          </RadioGroup>
          <TextField 
            variant="outlined" 
            label="Document Name" 
            style={docInputStyle}
            onChange={(e) => {setDocName(e.target.value)}}
          />

          <TextField 
            variant="outlined" 
            multiline={true} 
            rows={6} 
            label="Document Body" 
            onChange={(e) => {setDocBody(e.target.value)}}
          />
          <Divider />
          <Button variant="contained" color="primary" type="submit">
              Submit
          </Button>
        </FormControl>
      </form>
      <Divider />
      <ResponseView responseReturn={responseReturn} />
    </div>
  );
}

export default StoragePUT