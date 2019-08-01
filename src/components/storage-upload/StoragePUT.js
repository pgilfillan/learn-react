import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FormControl, FormLabel, FormControlLabel, Radio, 
         RadioGroup, TextField, Button } from '@material-ui/core';

function StoragePUT() {
  return (
    <div>
      <FormControl>
        <TextField variant="outlined" label="Class" />
        <FormLabel component="legend">Storage Type</FormLabel>
        <RadioGroup
          aria-label="storage-type"
          name="storage-type-choices"
        >
          <FormControlLabel value="shared" control={<Radio color="primary" />} label="Shared" />
          <FormControlLabel value="user" control={<Radio color="primary" />} label="User" />
        </RadioGroup>
        <Divider />
        <RadioGroup
          aria-label="search-type"
          name="search-type-choices"
        >
          <FormControlLabel value="generate" control={<Radio color="primary" />} label="Generate" />
          <FormControlLabel value="input" control={<Radio color="primary" />} label="Input" />
        </RadioGroup>
        <TextField variant="outlined" label="Document Name" />
        <TextField variant="outlined" multiline={true} rows={6} label="Document Body" />
        <Divider />
        <Button variant="contained" color="primary">
            Submit
        </Button>
      </FormControl>
      <Divider />
    </div>
  );
}

export default StoragePUT