import React from 'react';
import axios from "axios";
import { Button, ButtonGroup, Popper, Paper, Grow, 
         ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';

import DocumentEntry from './DocumentEntry'

function FileList(props) {
  // State
  const [documents, setDocuments] = React.useState([]);
  const [lastPath, setLastPath] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const refreshOptions = ['Never', '1s', '5s', '10s', '30s', '1m'];
  const refreshTimes = [null, 1000, 5000, 10000, 30000, 60000]

  function handleRefreshMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  function find() {
    if (props.path == '') return;

    const config = {headers: {
      'Content-Type': 'application/json',
    }}
    
    axios.get(props.path, config)
    .then(response => {
        setDocuments(response["data"]["documents"]);
    })
    .catch(error => console.log(error));
  }

  function getRefreshMenu() {
    return (
      <div>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button><RefreshIcon /></Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={(e) => {setOpen(prevOpen => !prevOpen);}}
          >
            {refreshOptions[selectedIndex]}
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {refreshOptions.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleRefreshMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }

  function getContent() {
    if (props.path == '') {
      
    } else if (documents.length == 0) {
      //return <div>{getRefreshMenu()}No documents found</div>
    }

    const documentsTest = [{document: {"vehicle_name": "tank", "speed": 10}, "name": "sdfjsdof", "self": "koifnsdf"},
                     {document: {"vehicle_name": "tank2", "speed": 112}, "name": "sdfjsdsfgdof", "self": "koifnsdfsdf"}]
    return (
      <div>
        {getRefreshMenu()}
        {documentsTest.map((doc, i) => <DocumentEntry key={i} name={doc["name"]} data={doc["document"]}></DocumentEntry>)}
      </div>
    );
  }

  if (props.path == lastPath) {
    return getContent();
  }

  setLastPath(props.path);
  find();
  return getContent();
}

export default FileList;