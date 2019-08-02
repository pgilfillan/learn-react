import React from 'react';
import { Typography } from '@material-ui/core';
import axios from "axios";


function MMConfig(props) {
  const [config, setConfig] = React.useState('');

  axios.get("/matchmaker/v1/config")
    .then(response => {
      setConfig(response["data"]);
    })
    .catch(error => console.log(error));

  return (
    <Typography component='div'>
      <pre>{config}</pre>
    </Typography>
  );
}

export default MMConfig;