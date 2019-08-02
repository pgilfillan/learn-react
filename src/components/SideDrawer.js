import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudIcon from '@material-ui/icons/Cloud';
import PeopleIcon from '@material-ui/icons/People';
import Link from '@material-ui/core/Link';
import { Route, Link as RouterLink } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import StoragePUT from './storage-upload/StoragePUT'
import StorageGET from './storage-view/StorageGET'
import LandingPage from './LandingPage'
import MMConfig from './MMConfig'

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function SideDrawer() {
  const classes = useStyles();
  const [storageOpen, storageSetOpen] = React.useState(false);
  const [mmOpen, mmSetOpen] = React.useState(false);

  function handleStorageClick() {
    storageSetOpen(!storageOpen);
  }

  function handleMMClick() {
    mmSetOpen(!mmOpen);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link variant="h6" noWrap color="inherit" component={RouterLink} to="/" underline="none">
            Kepler Dashboard
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
          <ListItem button onClick={handleStorageClick}>
            <ListItemIcon><CloudIcon/></ListItemIcon>
            <ListItemText primary="Storage" />
            {storageOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={storageOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} key="view" component={RouterLink} to="/view">
                <ListItemText primary="View Files" />
              </ListItem>
              <ListItem button className={classes.nested} key="upload" component={RouterLink} to="/upload">
                <ListItemText primary="Upload Files" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleMMClick}>
            <ListItemIcon><PeopleIcon/></ListItemIcon>
            <ListItemText primary="Matchmaker" />
            {mmOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={mmOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} key="playerviewer" to="/matchmaker/viewer/players.html">
                <ListItemText primary="Player Viewer" />
              </ListItem>
              <ListItem button className={classes.nested} key="matchviewer" to="/matchmaker/viewer">
                <ListItemText primary="Match Viewer" />
              </ListItem>
              <ListItem button className={classes.nested} key="config" component={RouterLink} to="/matchmaker/config">
                <ListItemText primary="Configuration" />
              </ListItem>
            </List>
          </Collapse>

        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route path="/" exact component={LandingPage} />
        <Route path="/view" exact component={StorageGET} />
        <Route path="/upload" component={StoragePUT} />
        <Route path="/matchmaker/config" component={MMConfig} />
      </main>
    </div>
  );
}