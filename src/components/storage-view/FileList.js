import React from 'react';
import axios from "axios";
import { ExpansionPanel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import DocumentEntry from './DocumentEntry'

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { documents: [], document: null };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
      const config = {headers: {
        'Content-Type': 'application/json',
      }}
      const path = "/server-shared-storage/v1/shared/classes/vehicles/documents";
      axios.get(path, config)
      .then(response => {
        this.setState({
          documents: response["data"]["documents"]
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const documents = this.state.documents;
    //const documents = [{document: {"vehicle_name": "tank", "speed": 10}, "name": "sdfjsdof", "self": "koifnsdf"},
    //                   {document: {"vehicle_name": "tank2", "speed": 112}, "name": "sdfjsdsfgdof", "self": "koifnsdfsdf"}]
    if (documents.length == 0) {
      return <div>No documents found</div>
    }
    
    return (
      <div>
        {documents.map((doc, i) => <DocumentEntry key={i}>{JSON.stringify(doc)}</DocumentEntry>)}
      </div>
    );
  }
}

export default FileList;