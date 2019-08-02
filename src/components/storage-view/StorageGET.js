import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, TextField,
         Select, MenuItem, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FileList from './FileList'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: "50%",
    paddingBottom: 20,
    marginTop: theme.spacing(3),
  },
  formEle: {
    marginTop: theme.spacing(3),
  },
  formButton: {
    marginTop: theme.spacing(3),
    width: "30%"
  }
}));

function StorageGET() {
  const classes = useStyles();

  // State
  const [typeValue, setTypeValue] = React.useState('shared');
  const [showUserName, setShowUserName] = React.useState(false);
  const userInputStyle = showUserName ? {} : {display: 'none'};
  const [queryTypeValue, setQueryTypeValue] = React.useState('all');
  const [showDocName, setShowDocName] = React.useState(false);
  const docInputStyle = showDocName ? {} : {display: 'none'};
  const [docName, setDocName] = React.useState('');
  const [showQuery, setShowQuery] = React.useState(false);
  const queryInputStyle = showQuery ? {} : {display: 'none'};
  const [query, setQuery] = React.useState('');
  const [dbValue, setDBValue] = React.useState("client-shared-storage");
  const [className, setClassName] = React.useState('');
  const [userID, setUserID] = React.useState('');
  const [isSingleDoc, setIsSingleDoc] = React.useState(false);
  
  const [GETPath, setGETPath] = React.useState('');

  function buildGETPath() {
    let path = "/";
    if (typeValue == "user") {
      path = path + dbValue + "/v1/users/" + userID + "/classes/" + className + "/documents";
    } else {
      path = path + dbValue + "/v1/shared/classes/" + className + "/documents";
    }

    if (queryTypeValue == "specific") {
      path = path + "/" + docName;
    } else if (queryTypeValue == "search") {
      path = path + "?" + query;
    }

    return path;
  }

  function handleTypeChange(event) {
    const newStorageType = event.target.value;
    setTypeValue(newStorageType);
    newStorageType == 'user' ? setShowUserName(true) : setShowUserName(false);
  }

  function handleQueryTypeChange(event) {
    const newQueryType = event.target.value;
    setQueryTypeValue(newQueryType);
    if (newQueryType == "all") {
      setShowQuery(false);
      setShowDocName(false);
    } else if (newQueryType == "specific") {
      setShowQuery(false);
      setShowDocName(true);
    } else {
      setShowQuery(true);
      setShowDocName(false);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    queryTypeValue == "specific" ? setIsSingleDoc(true) : setIsSingleDoc(false);
    setGETPath(buildGETPath());
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl className={classes.root}>
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

          <FormLabel className={classes.formEle}>Storage Type</FormLabel>
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
            className={classes.formEle}
          />

          <RadioGroup
            aria-label="search-type"
            name="search-type-choices"
            value={queryTypeValue}
            onChange={handleQueryTypeChange}
            className={classes.formEle}
          >
            <FormControlLabel value="all" control={<Radio color="primary" />} label="Get All" />
            <FormControlLabel value="specific" control={<Radio color="primary" />} label="Get Specific" />
            <TextField 
              variant="outlined" 
              label="Document Name" 
              style={docInputStyle} 
              onChange={(e) => {setDocName(e.target.value)}}
            />
            <FormControlLabel value="search" control={<Radio color="primary" />} label="Search" />
            <TextField 
              variant="outlined" 
              label="Query" 
              style={queryInputStyle}
              onChange={(e) => {setQuery(e.target.value)}}
            />
          </RadioGroup>
          <Button variant="contained" color="primary" type="submit" className={classes.formButton}>
            Find
          </Button>
        </FormControl >
      </form>
      <Divider />
      <FileList path={GETPath} isSingleDoc={isSingleDoc} />
    </div>
  );
}

export default StorageGET