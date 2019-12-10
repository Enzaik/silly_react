import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import firebase from 'firebase'

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    '& span': {
      fontFamily: 'Product Sans remote'
    }
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
    color: 'red'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontFamily: 'Product Sans remote',
    },
  },
  search: {
    position: 'relative',
    fontFamily: 'Product Sans remote',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(241, 243, 244)',
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    fontFamily: 'Product Sans remote',
  },
  inputRoot: {
    color: 'inherit',
  },
  close: {
    padding: theme.spacing(0.5),
  },
  toolbar: {
    color: 'black',
    backgroundColor: 'white'
  },
  inputInput: {
    fontFamily: 'Product Sans remote',
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));



export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick() {
    setOpen(true);
  }
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };



  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userSt, setUserSt] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // console.log('userrrrrrrr', user.photoURL);
      setUserSt(user.photoURL);
       console.log('userrrr', userSt);

    }
    else {
      console.log('user left from bar');
      setUserSt('none');
    }

    ;

  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List >
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem className={classes.item} button key={text} onClick={handleClick}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText className={classes.item} primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text} className={classes.item}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const avatar = (
    <div className={classes.root}>
      {console.log('avatar', userSt)}
      <Avatar alt="Remy Sharp" src={userSt} />
    </div>
  );



  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />

          </div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            
            {avatar}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
