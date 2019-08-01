import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, TextField,
         InputLabel, Select, MenuItem } from '@material-ui/core';

import FileList from './FileList'

function StorageGET() {
  // State
  const [typeValue, setTypeValue] = React.useState('shared');
  const [queryTypeValue, setQueryTypeValue] = React.useState('all');
  const [showDocName, setShowDocName] = React.useState(false);
  const docInputStyle = showDocName ? {} : {display: 'none'};
  const [showQuery, setShowQuery] = React.useState(false);
  const queryInputStyle = showQuery ? {} : {display: 'none'};
  const [dbValue, setDBValue] = React.useState("client-shared-storage");

  function handleTypeChange(event) {
    setTypeValue(event.target.value);
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

  return (
    <div>
      <FormControl>
        <InputLabel>Storage Source</InputLabel>
        <Select
          value={dbValue}
          onChange={(e) => {setDBValue(e.target.value)}}
        >

          <MenuItem value="client-shared-storage">client-shared-storage</MenuItem>
          <MenuItem value="client-user-storage">client-user-storage</MenuItem>
          <MenuItem value="server-shared-storage">server-shared-storage</MenuItem>
          <MenuItem value="server-user-storage">server-user-storage</MenuItem>
        </Select>

        <FormLabel component="legend">Storage Type</FormLabel>
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

        <TextField variant="outlined" label="Class" />
        <Divider />

        <RadioGroup
          aria-label="search-type"
          name="search-type-choices"
          value={queryTypeValue}
          onChange={handleQueryTypeChange}
        >
          <FormControlLabel value="all" control={<Radio color="primary" />} label="Get All" />
          <FormControlLabel value="specific" control={<Radio color="primary" />} label="Get Specific" />
          <TextField variant="outlined" label="Document Name" style={docInputStyle} />
          <FormControlLabel value="search" control={<Radio color="primary" />} label="Search" />
          <TextField variant="outlined" label="Query" style={queryInputStyle} />
        </RadioGroup>
      </FormControl>
      <Divider />
      <FileList />
    </div>
  );
}

export default StorageGET