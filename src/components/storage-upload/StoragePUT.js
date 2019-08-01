import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FormControl, FormLabel, FormControlLabel, Radio, 
         RadioGroup, TextField, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

function StoragePUT() {
  const classes = useStyles();

  // State
  const [typeValue, setTypeValue] = React.useState('shared');
  const [showDocName, setShowDocName] = React.useState(true);
  const docInputStyle = showDocName ? {} : {display: 'none'};
  const [dbValue, setDBValue] = React.useState("client-shared-storage");
  const [uploadTypeValue, setUploadTypeValue] = React.useState('input');

  function handleTypeChange(event) {
    setTypeValue(event.target.value);
  }

  function handleUploadTypeChange(event) {
    const newQueryType = event.target.value;
    setUploadTypeValue(newQueryType);
    if (newQueryType == "input") {
      setShowDocName(true);
    } else {
      setShowDocName(false);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("/" + dbValue + "/v1/" + typeValue +  "/classes/<class>/documents/<docname>");
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

          <TextField variant="outlined" label="Class" />
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
          <TextField variant="outlined" label="Document Name" style={docInputStyle}/>

          <TextField variant="outlined" multiline={true} rows={6} label="Document Body" />
          <Divider />
          <Button variant="contained" color="primary" type="submit">
              Submit
          </Button>
        </FormControl>
        <Divider />
      </form>
    </div>
  );
}

export default StoragePUT