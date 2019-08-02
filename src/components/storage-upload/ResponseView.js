import React from 'react';

function ResponseView(props) {
  const isEmpty = Object.keys(props.responseReturn).length == 0 ? true : false;
  const response = isEmpty ? "" : JSON.stringify(props.responseReturn["data"], null, 2)
  
  return (
    <div>
      {response}
    </div>
  );
}

export default ResponseView;