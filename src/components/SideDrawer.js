import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudIcon from '@material-ui/icons/Cloud';
import Link from '@material-ui/core/Link';
import { Route, Link as RouterLink } from 'react-router-dom';

import StoragePUT from './StoragePUT'
import StorageGET from './StorageGET'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#565454'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function Welcome(props) {
  return <h1>Hello</h1>;
}

export default function SideDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link variant="h6" noWrap color="inherit" component={RouterLink} to="/" underline="none">
            Dashboard
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button key="view" component={RouterLink} to="/test">
            <ListItemIcon><CloudIcon/></ListItemIcon>
            <ListItemText primary="View Files" />
          </ListItem>
          <ListItem button key="upload" component={RouterLink} to="/test2">
            <ListItemIcon><CloudIcon/></ListItemIcon>
            <ListItemText primary="Upload Files" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route path="/" exact component={Welcome} />
        <Route path="/test" exact component={StorageGET} />
        <Route path="/test2" component={StoragePUT} />
      </main>
    </div>
  );
}