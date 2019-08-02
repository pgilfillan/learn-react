import React from 'react';
import axios from "axios";
import { Button, ButtonGroup, Popper, Paper, Grow, 
         ClickAwayListener, MenuList, MenuItem, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import DocumentEntry from './DocumentEntry'

const useStyles = makeStyles(theme => ({
  refreshMenu: {
    zIndex: theme.zIndex.drawer + 1,
  },
  root: {
    marginTop: theme.spacing(3),
  },
  refreshEle: {
    marginBottom: theme.spacing(3),
  },
}));

function FileList(props) {
  const classes = useStyles();

  // State
  const [documents, setDocuments] = React.useState([]);
  const [lastPath, setLastPath] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [timerID, setTimerID] = React.useState(0);

  const refreshOptions = ['Never', '1s', '5s', '10s', '30s', '1m'];
  const refreshTimes = [null, 1000, 5000, 10000, 30000, 60000]

  function handleRefreshMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
    
    if (index != 0) {
      setTimerID(setInterval(
        () => {find()},
        refreshTimes[index]
      ));
      find();
    } else {
      clearInterval(timerID);
    }
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  function handleRefreshClick() {
    find();
  }

  function find() {
    if (props.path == '') return;

    const config = {headers: {
      'Content-Type': 'application/json',
    }}
    
    axios.get(props.path, config)
    .then(response => {
        if (props.isSingleDoc) {
          const pathSplit = props.path.split('/')
          const doc = {"document": response["data"], 
                       "name": pathSplit[pathSplit.length-1], 
                       "self": props.path.substring(props.path.indexOf("/", 1))};
          setDocuments([doc]);
        } else {
          setDocuments(response["data"]["documents"]);
        }
    })
    .catch(error => console.log(error));
  }

  function getRefreshMenu() {
    return (
      <div className={classes.refreshEle}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleRefreshClick}><RefreshIcon /></Button>
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
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal className={classes.refreshMenu}>
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
      return <div className={classes.root}>{getRefreshMenu()}</div>
    } else if (documents.length == 0) {
      return <div className={classes.root}>{getRefreshMenu()}<Typography>No documents found</Typography></div>
    }

    //const documentsTest = [{document: {"vehicle_name": "tank", "speed": 10}, "name": "sdfjsdof", "self": "/koifnsdf"},
    //                 {document: {"vehicle_name": "tank2", "speed": 112}, "name": "sdfjsdsfgdof", "self": "/koifnsdfsdf"}]
    return (
      <div className={classes.root}>
        {getRefreshMenu()}
        {documents.map((doc, i) => {
            return (
              <DocumentEntry 
                key={i} 
                name={doc["name"]} 
                data={doc["document"]} 
                self={doc["self"]} 
                storageSource={props.path.split("/")[1]}
              />
            );
        })}
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