import React from 'react';
import { Typography } from '@material-ui/core';

function ResponseView(props) {
  const isEmpty = Object.keys(props.responseReturn).length == 0 ? true : false;
  const response = isEmpty ? "" : JSON.stringify(props.responseReturn["data"], null, 2)
  
  return (
    <Typography component='div'>
      <pre>{response}</pre>
    </Typography>
  );
}

export default ResponseView;