import React from 'react';
import Divider from '@material-ui/core/Divider';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';

import FileList from './FileList'

function StorageGET() {
  return (
    <div>
      <FormControl>
        <TextField variant="outlined" label="Class" />
        <FormLabel component="legend">Storage Type</FormLabel>
        <RadioGroup
          aria-label="storage-type"
          name="storage-type-choices"
        >
          <FormControlLabel value="user" control={<Radio color="primary" />} label="User" />
          <FormControlLabel value="shared" control={<Radio color="primary" />} label="Shared" />
        </RadioGroup>
        <Divider />
        <RadioGroup
          aria-label="search-type"
          name="search-type-choices"
        >
          <FormControlLabel value="all" control={<Radio color="primary" />} label="Get All" />
          <FormControlLabel value="specific" control={<Radio color="primary" />} label="Get Specific" />
          <FormControlLabel value="search" control={<Radio color="primary" />} label="Search" />
        </RadioGroup>
      </FormControl>
      <Divider />
      <FileList />
    </div>
  );
}

export default StorageGET