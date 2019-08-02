import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
  data: {
    width: '100%',
  }
}));

function DocumentEntry(props) {
  const classes = useStyles();
  
  function handleDeleteClick() {
    const path = "/" + props.storageSource + props.self;
    axios.delete(path)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
  }

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{props.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.data}>
        <Typography paragraph={true} component='div'>
          <pre>{JSON.stringify(props.data, null, 2)}</pre>
        </Typography>
        <Divider />
        <div>
          <Button 
            variant="contained" 
            color="secondary" 
            className={classes.button}
            onClick={handleDeleteClick}
          >
            Delete
            <DeleteIcon className={classes.rightIcon} />
          </Button>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default DocumentEntry;